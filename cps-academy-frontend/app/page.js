import Image from "next/image";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import Testimonial from "./_components/Testimonials/Testimonial";
import Course from "./course/page";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <div className="container py-10">
        <h1 className="text-3xl font-semibold py-5">Popular Courses</h1>
        <Course />
      </div>
      <Testimonial />
      <Footer />
    </>
  );
}
