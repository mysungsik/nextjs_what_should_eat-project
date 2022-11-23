import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./homepage-slide.module.css";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper";

function HompageSlider() {
  return (
    <div className={styles.maindiv}>
      <h1> WHAT are U eating today?</h1>
        <Swiper
          className={styles.slider}
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          modules={[EffectCube, Pagination]}
        >
          <SwiperSlide>
            <Link href={"/allfoods"}>
              <Image
                src={
                  "/image/homepage-slider/brooke-lark-wMzx2nBdeng-unsplash-fix.jpg"
                }
                width={2000}
                height={1500}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={"/random"}>
              <Image
                src={
                  "/image/homepage-slider/jonathan-pielmayer-Gn64mz9hTqE-unsplash-fix.jpg"
                }
                width={1500}
                height={1000}
              ></Image>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={"/calories"}>
              <Image
                src={
                  "/image/homepage-slider/hermes-rivera-Ww8eQWjMJWk-unsplash-fix.jpg"
                }
                width={1500}
                height={1000}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={"/contact"}>
              <Image
                src={
                  "/image/homepage-slider/adam-jaime-dmkmrNptMpw-unsplash-fix.jpg"
                }
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
