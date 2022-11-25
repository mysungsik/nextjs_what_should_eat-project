import Image from "next/image";
import styles from "./food-detail-form.module.css";
import Button from "../ui/card/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function FoodDetailForm(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    id,
    name,
    image,
    price,
    taste,
    category,
    alt,
    calorie,
    nutri,
    content,
    isSameArray,
  } = props;
  const [addingButton, setAddingButton] = useState(isSameArray);

  // API 로 보내줄 데이터는, email 과 foodid
  // API 에서는, 그것들을 db에서 뽑아 판단해, 적절한 조치를 취한다.

  async function saveToCart() {
    if (status === "unauthenticated") {
      alert("로그인 하셔야 이용가능합니다.");
      router.replace("/login");
      return;
    }
    const foodId = id;

    const userEmail = session.user.email;
    const inputFavoriteData = { foodId, userEmail };

    const response = await fetch("/api/userdetail/addfavorite", {
      method: "POST",
      body: JSON.stringify(inputFavoriteData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    setAddingButton((prev) => !prev);
  }

  return (
    <main className={styles.maindiv}>
      <div className={styles.imagediv}>
        <h1> {name}</h1>
        <Image
          src={image}
          width={500}
          height={500}
          alt={alt}
          quality={30}
          priority
        />
      </div>
      <div className={styles.foodinfo}>
        <div>
          <h3> 평균 가격</h3>
          <p>
            <span>{price}</span> 원
          </p>
        </div>
        <div>
          <h3> 맛 태그</h3>
          <p>
            <span>{taste}</span>
          </p>
        </div>
        <div>
          <h3> 카테고리</h3>
          <p>
            <span>{category}</span>
          </p>
        </div>
      </div>

      <div className={styles.foodnutri}>
        <h3> 영양성분</h3>
        <div className={styles.foodnutriSubdiv}>
          <div className={styles.foodnutriSub}>
            <p className={styles.infoname}>칼로리</p>{" "}
            <span>{calorie} kcal</span>
            <p>/ 100g </p>
          </div>
          <div className={styles.foodnutriSub}>
            <p className={styles.infoname}>탄 / 단 / 지</p> <span>{nutri}</span>
            <p>/ 100g </p>
          </div>
        </div>
      </div>

      <div className={styles.foodcontent}>
        <div>
          <h3> 설명</h3>
          <p> {content}</p>
        </div>
      </div>
      {/* isSameArray 가, useDetail의, "랜덤선택기" 페이지에서는 필요 없기 때문에 (랜덤선택기에는 isSameArray 를 넣어주지않는다.), 
      "랜덤선택기 페이지"에서는 "보이지 않도록" "있다면" 조건을 넣어준다. */}
      {isSameArray != null && (
        <div className={styles.buttondiv}>
          <Button onClick={saveToCart}>{addingButton ? "삭제" : "추가"}</Button>
        </div>
      )}
    </main>
  );
}

// 저장 로직은 [ /api/addfavorite ] 에서 확인한다.

export default FoodDetailForm;
