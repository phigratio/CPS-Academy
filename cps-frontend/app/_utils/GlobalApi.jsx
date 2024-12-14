import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

// Fetch all courses
const fetchRoles = async (token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axiosClient.get("/users-permissions/roles", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching roles:", error);
    throw error;
  }
};

// Fetch all courses
const getCourse = async (token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Use empty headers if no token
    const response = await axiosClient.get("/courses?populate=*", { headers });
    return response.data.data || [];
  } catch (error) {
    console.log("Error fetching courses:", error);
    return [];
  }
};

const fetchUsers = async (token) => {
  try {
    console.log("Token being used:", token); // Log the token

    const response = await axiosClient.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Full error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.config?.headers,
    });
    throw error;
  }
};

const updateUserRole = async (userId, newRole, token) => {
  try {
    // Prepare the headers with the authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Prepare the body of the request
    const body = {
      role: newRole, // Assuming newRole is a string like "Normal User" or "Student"
    };

    // Send the PUT request to update the user's role
    const response = await axiosClient.put(`/users/${userId}`, body, {
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.log("Error updating user role:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.config?.headers,
    });

    // Throw the error to be handled by the calling function
    throw error;
  }
};

// Fetch a specific course by ID
const getCourseById = async (id, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Use empty headers if no token
    const response = await axiosClient.get(`/courses/${id}?populate=*`, {
      headers,
    });
    return response.data.data || null;
  } catch (error) {
    console.log(`Error fetching course with ID ${id}:`, error);
    return null;
  }
};

// Other functions remain unchanged
const loginUser = async (email, password) => {
  const response = await axiosClient.post("/auth/local", {
    identifier: email,
    password,
  });

  const token = response.data.jwt;
  if (token) {
    localStorage.setItem("jwt", token);
  }
  return token;
};

// Register a new user
const registerUser = async (username, email, password) => {
  try {
    const response = await axiosClient.post("/auth/local/register", {
      username,
      email,
      password,
    });

    return response.data; // Return the user data and JWT from Strapi
  } catch (error) {
    console.log("Error registering user:", error);

    // Handle specific errors if needed
    throw error; // Rethrow the error for handling in the calling function
  }
};

export default {
  getCourse,
  getCourseById,
  loginUser,
  fetchUsers,
  updateUserRole,
  fetchRoles,
  registerUser,
};
