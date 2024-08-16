"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./slideShow.css";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";

interface ISlideShow {
  slides: string[];
  title?: string;
  classMame?: string;
}

export function SlideShowMobile({ slides, title, classMame }: ISlideShow) {
  return (
    <div className={classMame}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{
          delay: 4500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide}>
            <Image
              src={`/products/${slide}`}
              alt={title ?? "Picture of the author"}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
