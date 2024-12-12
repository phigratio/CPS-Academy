"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

function Testimonial() {
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: false }));

  const testimonials = [
    {
      id: 1,
      name: "Zaman Hossain",
      course: "Full Stack Web Development",
      quote:
        "This programming course completely transformed my career. The hands-on approach and comprehensive curriculum helped me land my dream job as a software engineer.",
      avatar: "/assets/student1.jpg",
    },
    {
      id: 2,
      name: "Shikder Jamil",
      course: "Python Programming Masterclass",
      quote:
        "I went from knowing nothing about coding to building complex applications. The instructors are incredibly supportive and the learning path is crystal clear.",
      avatar: "/assets/student2.jpg",
    },
    {
      id: 3,
      name: "Rubel Islam",
      course: "React and Modern JavaScript",
      quote:
        "The depth of knowledge in this course is unparalleled. I've not only learned to code but also understood the underlying principles of modern web development.",
      avatar: "/assets/student3.jpg",
    },
    {
      id: 4,
      name: "Babul Mondol",
      course: "Data Science with Python",
      quote:
        "A game-changing course that provided me with practical skills in data analysis and machine learning. The real-world projects were incredibly insightful.",
      avatar: "/assets/student4.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from students who have transformed their careers through our
          comprehensive programming courses.
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {/* Group testimonials in pairs */}
          <CarouselItem className="md:basis-1/1">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-4">
                    <Quote className="text-blue-500 mr-3 w-10 h-10" />
                    <p className="text-gray-600 italic">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <Image
                      src={testimonial.avatar || "/api/placeholder/100/100"}
                      alt={testimonial.name}
                      height={16}
                      width={16}
                      className=" rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.course}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>

          <CarouselItem className="md:basis-1/1">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.slice(2, 4).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-4">
                    <Quote className="text-blue-500 mr-3 w-10 h-10" />
                    <p className="text-gray-600 italic">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <Image
                      src={testimonial.avatar || "/api/placeholder/100/100"}
                      alt={testimonial.name}
                      width={16}
                      height={16}
                      className="rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.course}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8 lg:left-16" />
        <CarouselNext className="right-4 md:right-8 lg:right-16" />
      </Carousel>
    </div>
  );
}

export default Testimonial;
