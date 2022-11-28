// 1) Page 에서 "사전데이터페칭"으로 "모든 데이터와, 모든 Favorties 데이터"를 가져와, "컴포넌트에 넘김"
// 2) useSeesion 으로, "모든 Favorties 데이터" 에  담긴 것들 중, "유저에게 맞는 데이터만 불러와서 (find)"
// 3) 불러온 Array 로, allFoodData 를, for, find 처리해서, 값을 남긴다.

import FoodList from "../food-components/food-list";
import styles from "./favorite-foods.module.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Favorites(props) {
  const { data: session, status } = useSession();
  const { allFoods, allFavoriteFoods } = props; // 모든데이터와, 모든 Favoites 데이터를 가져와서
  const [favoritesData, setFavoritesData] = useState([]); // 각 유저의, 최종 Favorite Food Data

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

  return (
    <main className={styles.maindiv}>
      <h1> 찜한 음식</h1>
      {favoritesData.length == 0 && (
        <div className={styles.nolist}>
          <p>찜한 항목이 없습니다</p> <p>"뭐먹지 페이지"에서 "찜" 해주세요</p>
        </div>
      )}
      <div>
        <FoodList foodData={favoritesData} />
      </div>
    </main>
  );
}

export default Favorites;
