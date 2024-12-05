import Image from "next/image";
import React from "react";

function Course() {
  return (
    <>
      <div className="container px-0 py-10">
        <div className="grid grid-cols-4 items-center gap-10">
          <div className="">
            <Image
              src="/assets/cps.png"
              className="hover:scale-110 border-2 border-transparent hover:border-blue-400 hover:border-2 hover:transition-transform"
              width={1000}
              height={50}
            />
            <h3>Course 1</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
