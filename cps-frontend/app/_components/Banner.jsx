"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function Banner() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {/* Banner Item 1 */}
          <CarouselItem className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-4">
                <img
                  src="/assets/banner1.jpg"
                  alt="banner 1"
                  className="w-full h-[60vh] object-cover rounded-lg"
                />
              </div>
            </div>
          </CarouselItem>
          {/* Banner Item 2 */}
          <CarouselItem className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-4">
                <img
                  src="/assets/cps.png"
                  alt="banner 2"
                  className="w-full h-[60vh] object-cover rounded-lg"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8 lg:left-16" />
        <CarouselNext className="right-4 md:right-8 lg:right-16" />
      </Carousel>
    </div>
  );
}

export default Banner;
