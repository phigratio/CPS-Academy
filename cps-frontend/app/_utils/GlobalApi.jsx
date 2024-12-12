import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

// Fetch all courses

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

export default { getCourse, getCourseById, loginUser };
