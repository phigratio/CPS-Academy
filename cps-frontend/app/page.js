import Image from "next/image";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import Testimonial from "./_components/Testimonials/Testimonial";
import Footer from "./_components/Footer";
import GlobalApi from "./_utils/GlobalApi";
import CoursesList from "./Courses/page";
export default async function Home() {
  const getCourse = await GlobalApi.getCourse();

  console.log("getCourse", getCourse);

  return (
    <>
      <Header />
      <Banner />
      <div className="container py-10">
        <h1 className="text-3xl font-semibold py-5">Popular Courses</h1>
        <CoursesList courses={getCourse} />
      </div>
      <Testimonial />
      <Footer />
    </>
  );
}
