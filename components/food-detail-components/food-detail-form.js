import Image from "next/image";
import styles from "./food-detail-form.module.css";
import Button from "../ui/card/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

function FoodDetailForm(props) {
  const { data: session, status } = useSession();
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
    const foodId = id;
    const userEmail = session.user.email;

    if (!userEmail) {
      alert("로그인 해야 이용이 가능합니다.");
      return;
    }

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
        <Image src={image} width={500} height={500} alt={alt} priority />
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
        <div>
          <p>
            <span>칼로리</span> : <span>{calorie} kcal</span> / 100g
          </p>
          <span> // </span>
          <p>
            <span>탄단지</span> : <span>[{nutri}]</span> / 100g
          </p>
        </div>
      </div>

      <div className={styles.foodcontent}>
        <div>
          <h3> 설명</h3>
          <p> {content}</p>
        </div>
      </div>
      <div>
        <Button onClick={saveToCart}> {addingButton ? "삭제" : "추가"}</Button>
      </div>
    </main>
  );
}

// 저장버튼을 누르면, API 에 요청을 해서,
//  DB의 [eating db 안], [FAVORITE 콜렉션 안]에, email 이, useremail 과 같은 데이터가 없다면,
// favorite id : [] 안에 담고

// useremail 과 같은 데이터가 있다면, favorite id:[] 를 ... 으로 불러와, 추가적으로 foodid 를 넣어주고,

// favorite id : 안의 값을 확인하여, 같은 foodid가 있다면, 아무일도 일어나지 않고, "이미 추가되었습니다" 를 띄운다.

export default FoodDetailForm;
