// db에, favorite 이라는, db를 만들어,

// user email 과 함께 food id 를 같이 저장

// 불러올때, 1. userid 에 저장된, foodid 를 불러옴 [배열형태로]
//          전체 foods 를 불러와, filter

// 관심 음식 불러오기는 버튼누르면, 아래로 쭉 펼쳐지게 하기

import FoodList from "../food-components/food-list";
import styles from "./favorite-foods.module.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function Favorites() {
  const { data: session, status } = useSession();
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    fetch("/api/userdetail/favorite-food-for-user", {
      method: "POST",
      body: JSON.stringify({ useEmail: session.user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFavoritesData(data.favorites));
  }, []);

  // 직접 여기에서, 값을 찾아서, Foodlist 로 넘긴다.
  // 값을 찾는것은 API 를 통해서, FETCH

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
