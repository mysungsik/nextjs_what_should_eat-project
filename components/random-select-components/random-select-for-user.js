// 1) Page 에서 "사전데이터페칭"으로 "모든 데이터와, 모든 Favorties 데이터"를 가져와, "컴포넌트에 넘김"
// 2) useSeesion 으로, "모든 Favorties 데이터" 에  담긴 것들 중, "유저에게 맞는 데이터만 불러와서 (find)"
// 3) 불러온 Array 로, allFoodData 를, for, find 처리해서, 값을 남긴다.

import Button from "../ui/card/button";
import FoodDetailForm from "../food-detail-components/food-detail-form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./random-select.module.css";

function RandomSelectComponent(props) {
  const { allFoods, allFavoriteFoods } = props; // page 에서 "사전데이터페칭" 으로 값을 가져옴
  const { data: session, status } = useSession();
  const [randomFood, setRandomFood] = useState(); // 모든 찜한 음식들의 데이터들 중, "화면에 표시될 단 하나의 데이터"
  const [favoritesData, setFavoritesData] = useState([]); // 모든 찜한 음식들의 데이터
  const [showFood, setShowFood] = useState(false); // 랜덤! 버튼을 누르면 나올 모듈
  const [noData, setNoData] = useState(false); // 데이터가 없다면, 나올 모듈

  useEffect(() => {
    if (status === "authenticated") {
      const userFavoriteFoodArray = allFavoriteFoods.find(
        (food) => food.userEmail == session.user.email
      );

      let favorites = [];

      if (userFavoriteFoodArray) {
        for (const foodid of userFavoriteFoodArray.foodArray) {
          const result = allFoods.find((food) => food.id === foodid);
          favorites.push(result);
        }
      }
      setFavoritesData(favorites);
    }
  }, [status]);

  let randomNumber;

  function randomSelect() {
    if (favoritesData.length == 0) {
      setNoData(true);
      return;
    } else {
      randomNumber = Math.ceil(Math.random() * favoritesData.length);

      setRandomFood(favoritesData[randomNumber - 1]);
      setShowFood(true);
    }
  }

  return (
    <div className={styles.maindiv}>
      {!showFood && (
        <div>
          <h2> 이 음식은 어떠신가요?</h2>
          <p>{session.user.email} 님의 찜한 음식 내에서 골라드립니다. </p>
        </div>
      )}
      <Button onClick={randomSelect}> 랜덤!</Button>
      {noData && <div className={styles.noSave}> 찜한 음식이 없습니다!</div>}
      {showFood && (
        <div>
          <FoodDetailForm
            id={randomFood.id}
            name={randomFood.name}
            image={randomFood.image}
            price={randomFood.price}
            taste={randomFood.taste}
            category={randomFood.category}
            alt={randomFood.alt}
            calorie={randomFood.calorie}
            nutri={randomFood.nutri}
            content={randomFood.content}
          />
        </div>
      )}
    </div>
  );
}

export default RandomSelectComponent;
