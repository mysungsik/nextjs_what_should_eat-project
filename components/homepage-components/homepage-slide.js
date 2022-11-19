import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./homepage-slide.module.css";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";

function HompageSlider() {
  return (
    <div className={styles.maindiv}>
      <h1> WHAT are U eating today?</h1>
      <Swiper
        className={styles.slider}
        spaceBetween={50}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Link href={"/allfoods"}>
            <Image
              src={
                "/image/homepage-slider/brooke-lark-wMzx2nBdeng-unsplash.jpg"
              }
              width={1500}
              height={1000}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"/"}>
            <Image
              src={
                "/image/homepage-slider/jonathan-pielmayer-Gn64mz9hTqE-unsplash.jpg"
              }
              width={1500}
              height={1000}
            ></Image>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"/contact"}>
            <Image
              src={"/image/homepage-slider/kiyoshi-Rm1Ca_g5Wck-unsplash.jpg"}
              width={1500}
              height={1000}
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HompageSlider;
