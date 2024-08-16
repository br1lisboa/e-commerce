"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideShow.css";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

interface ISlideShow {
  slides: string[];
  title?: string;
  classMame?: string;
}

export function SlideShow({ slides, title, classMame }: ISlideShow) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <div className={classMame}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 4500,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide}>
            <Image
              src={`/products/${slide}`}
              alt={title ?? "Picture of the author"}
              width={1024}
              height={800}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide}>
            <Image
              src={`/products/${slide}`}
              alt={title ?? "Picture of the author"}
              width={300}
              height={300}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
