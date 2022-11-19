import FoodList from "./food-list";
import styles from "./food-category-header.module.css";
import { useState, useEffect } from "react";

// 카테고리 누르면, Allfoods 에서 온 Data 들을, filter  처리 해서, Food-list 로 보내줌
// All 을 누르면, Allfoods 에서 온 Data들을, filter 처리 없이, Foodlist 로 보내줌

function FoodCategoryHeader(props) {
  const { foodData } = props;
  const [insertFoodData, setInsertFoodData] = useState(foodData);

  // 버튼 누르면, food 선별작업 해서, 새로운 데이터를 만든 후, Foodlist 로 넘겨준다.

  function foodFilter(category) {
    const filteredFoods = foodData.filter((food) => food.category === category);

    setInsertFoodData(filteredFoods);
  }

  function fansyFilter() {
    const filteredFoods = foodData.filter((food) => food.fansy == "true");

    setInsertFoodData(filteredFoods);
  }

  return (
    <div>
      <header className={styles.header}>
        <ul className={styles.ul}>
          <li onClick={() => setInsertFoodData(foodData)}>전체</li>
          <li onClick={() => foodFilter("다이어트")}> 다이어트 </li>
          <li onClick={() => foodFilter("한식")}> 한식 </li>
          <li onClick={() => foodFilter("양식")}> 양식</li>
          <li onClick={() => foodFilter("중식")}> 중식</li>
          <li onClick={() => foodFilter("일식")}> 일식</li>
          <li onClick={() => foodFilter("베트남")}> 베트남 </li>
          <li onClick={() => fansyFilter()}> 고급 </li>
        </ul>
      </header>
      <main>
        <FoodList foodData={insertFoodData} />
      </main>
    </div>
  );
}
export default FoodCategoryHeader;
