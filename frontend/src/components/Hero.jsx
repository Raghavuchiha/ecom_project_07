import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      leftImg: "/src/assets/p_img0.3",
      rightImg: "/src/assets/p_img0.4.webp",
      title: "HARRY POTTER",
      subtitle: "THE MARAUDER'S MAP",
      tag: "NEVER SEEN BEFORE",
    },
    {
      leftImg: "/src/assets/pp_img0.png",
      rightImg: "/src/assets/pp_img0.png",
      title: "SOLAR PRINT",
      subtitle: "LIMITED EDITION",
      tag: "NEW DROP",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="flex w-full h-[80vh]">
              {/* left image */}
              <img
                src={item.leftImg}
                alt="left slide"
                className="w-1/2 h-full object-cover"
              />

              {/* Center text */}
              <div className="w-1/2 flex flex-col justify-center items-center gap-3 bg-white text-black text-center px-10">
                <p className="text-sm tracking-[4px]">{item.tag}</p>
                <h1 className="text-4xl font-bold">{item.title}</h1>
                <p className="text-xl tracking-widest">{item.subtitle}</p>
              </div>

              {/* right image */}
              <img
                src={item.rightImg}
                alt="right slide"
                className="w-1/2 h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
