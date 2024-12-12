"use client";
import { useState, useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Try to get the token
        const coursesData = await GlobalApi.getCourse(token); // Fetch courses (with or without token)
        setCourses(coursesData || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleModuleView = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId], // Toggle the view state for the module
    }));
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="courses-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="course-card border shadow-lg p-4 rounded-md bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{course.Title}</h2>
          <p className="text-gray-700 mb-4">
            {course.Description.length > 100
              ? `${course.Description.substring(0, 100)}...`
              : course.Description}
          </p>
          <Dialog>
            <DialogTrigger
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setSelectedCourse(course)}
            >
              View Course
            </DialogTrigger>
            {selectedCourse && selectedCourse.id === course.id && (
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-6">
                <DialogTitle className="text-xl font-bold">
                  {selectedCourse.Title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-gray-600">
                  {selectedCourse.Description}
                </DialogDescription>
                <h3 className="mt-4 font-medium">Modules:</h3>
                {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
                  selectedCourse.modules.map((module) => (
                    <div
                      key={module.id}
                      className="module-card mt-2 border p-4 rounded-md bg-gray-100"
                    >
                      <h4 className="font-semibold">{module.Title}</h4>
                      <p className="text-gray-600 mb-2">
                        {expandedModules[module.id]
                          ? module.Details // Show full details
                          : module.Details.length > 100
                          ? `${module.Details.substring(0, 100)}...` // Show shortened version
                          : module.Details}
                      </p>
                      <button
                        className="text-blue-500 underline mt-2"
                        onClick={() => toggleModuleView(module.id)}
                      >
                        {expandedModules[module.id] ? "View Less" : "View More"}
                      </button>
                      {expandedModules[module.id] && (
                        <ul className="list-disc pl-5 mt-2">
                          {module.topics_covered.map((topic, index) => (
                            <li key={index} className="mb-1">
                              <strong>{topic.name}</strong> - {topic.duration} (
                              {topic.difficulty})<br />
                              <span className="text-sm text-gray-600">
                                {topic.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-red-500">
                      You need to buy this course to view modules.
                    </p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Buy Course
                    </button>
                  </div>
                )}
              </DialogContent>
            )}
          </Dialog>
        </div>
      ))}
    </div>
  );
}
