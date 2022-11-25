import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import FoodList from "./food-list";
import styles from "./food-category-header.module.css";
import { useState, useEffect } from "react";

// "카테고리" 누르면, Allfoods 에서 온 Data 들을, filter  처리 해서, Food-list 로 보내줌
// "전체" 을 누르면, Allfoods 에서 온 Data들을, filter 처리 없이, Foodlist 로 보내줌
// ** 음식 맛구성  [ 매콤  ,달달 , 짭짤, 삼삼, 새콤 , 씁쓸]

function FoodTagsHeader(props) {
  const { foodData } = props;

  const sortedFoodData = foodData.sort((A, B) => (A.name > B.name ? 1 : -1));
  const [insertFoodData, setInsertFoodData] = useState(foodData);

  // 버튼 누르면, food 선별작업 해서, 새로운 데이터를 만든 후, Foodlist 로 넘겨준다.
  // 태그가 하나라도 포함되어있으면, 보여준다.

  function foodFilter(taste) {
    const filteredFoods = foodData.filter((food) => food.taste.includes(taste));

    setInsertFoodData(filteredFoods);
  }

  function fansyFilter() {
    const filteredFoods = foodData.filter((food) => food.fansy == "true");

    setInsertFoodData(filteredFoods);
  }

  return (
    <div>
      <header className={styles.header}>
        <Swiper
          className={styles.slider}
          spaceBetween={20}
          slidesPerView={7}
          effect={"cube"}
        >
          <SwiperSlide>
            <li onClick={() => setInsertFoodData(foodData)}>전체</li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("매콤")}> 매콤 </li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("달달")}> 달달 </li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("짭짤")}> 짭짤</li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("삼삼")}> 삼삼</li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("새콤")}> 새콤</li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => foodFilter("씁쓸")}> 씁쓸 </li>
          </SwiperSlide>
          <SwiperSlide>
            <li onClick={() => fansyFilter()}> 고급 </li>
          </SwiperSlide>
          <SwiperSlide>
            <li> </li>
          </SwiperSlide>
        </Swiper>
        <p>&#5130; 스와이프하세요 &#5125; </p>
      </header>
      <main>
        <FoodList foodData={insertFoodData} />
      </main>
    </div>
  );
}
export default FoodTagsHeader;
