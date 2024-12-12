"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";

export default function CourseDetailPage() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("jwt_token");

        if (!token) {
          console.error("No JWT token found");
          setLoading(false);
          return;
        }

        // Get course ID from URL params
        const courseId = params.id;

        if (courseId) {
          const courseData = await GlobalApi.getCourseById(courseId, token);
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [params.id]);

  if (loading) return <div>Loading course details...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-detail container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{course.attributes.Title}</h1>
      <div className="course-description">
        <p>{course.attributes.Description}</p>
      </div>
    </div>
  );
}
