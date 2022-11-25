// ** 음식 저장시 [id, name, price, taste , category, fancy, calorie, content]

// ** 음식 카테고리 [ 다이어트 , 한식 , 양식 , 일식 , 베트남 , 중식 , 디저트 ]
// ** 음식 맛구성  [ 매콤  ,달달 , 짭짤, 삼삼, 새콤 , 씁쓸]
// ** 음식 고급구성 [ true or false ]
// ** 음식 정보구성 [ 칼로리, 영양성분(탄단지) ]

import styles from "./adding-form.module.css";
import Button from "../ui/card/button";
import { useState } from "react";

function AddingForm(props) {
  let { allFoodsLength } = props;
  let autoId = String(allFoodsLength + 1);
  const [id, setId] = useState(autoId);
  const [name, setName] = useState();
  const [image, setImage] = useState("/image/food/");
  const [category, setCategory] = useState();
  const [taste, setTaste] = useState();
  const [price, setPrice] = useState();
  const [fansy, setFansy] = useState();
  const [calorie, setCalorie] = useState();
  const [nutri, setNutri] = useState("탄수화물: g // 단백질: g // 지방: g");
  const [content, setContent] = useState();

  //등록버튼 함수
  async function submitHandler(e) {
    e.preventDefault();
    const inputData = {
      id,
      name,
      image,
      category,
      taste,
      price,
      fansy,
      calorie,
      nutri,
      content,
    };

    // db에 등록
    const response = await fetch("/api/addingfood", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    // 정상적으로 data가 오면, 전부 리셋
    if (responseData.data) {
      setId("");
      setName("");
      setImage("");
      setCategory("");
      setTaste("");
      setPrice("");
      setFansy("");
      setCalorie("");
      setNutri("");
      setContent("");
    }
  }
  return (
    <div className={styles.maindiv}>
      <h1> 음식 등록기</h1>
      <form>
        <div>
          <label htmlFor="foodId"> 음식번호 </label>
          <input
            type={"text"}
            id="foodId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foodName"> 음식이름 </label>
          <input
            type={"text"}
            id="foodName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foodImage"> 음식이미지URL </label>
          <input
            type={"text"}
            id="foodImage"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foodCategory"> 카테고리 </label>
          <input
            type={"text"}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={
              "[ 다이어트 , 한식 , 양식 , 일식 , 베트남 , 중식 , 디저트 ]"
            }
            required
          />
        </div>
        <div>
          <label htmlFor="foodTaste"> 맛구성 </label>
          <input
            type={"text"}
            id="taste"
            value={taste}
            onChange={(e) => setTaste(e.target.value)}
            placeholder={"[ 매콤  ,달달 , 짭짤, 삼삼, 새콤 , 씁쓸 ]"}
            required
          />
        </div>
        <div>
          <label htmlFor="foodPrice"> 평균가격 </label>
          <input
            type={"text"}
            id="foodPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foodFansy"> 고급 </label>
          <input
            type={"text"}
            id="foodFansy"
            value={fansy}
            onChange={(e) => setFansy(e.target.value)}
            placeholder={"[ true or false ]"}
            required
          />
        </div>
        <div>
          <label htmlFor="foodCalorie"> 칼로리 </label>
          <input
            type={"text"}
            id="foodCalorie"
            value={calorie}
            onChange={(e) => setCalorie(e.target.value)}
            placeholder={"[ 숫자만 적을것 /100g 단위 ]"}
            required
          />
        </div>
        <div>
          <label htmlFor="foodNutri"> 영양성분 </label>
          <input
            type={"text"}
            id="foodNutri"
            value={nutri}
            onChange={(e) => setNutri(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foodContent"> 음식설명 </label>
          <textarea
            rows={6}
            id={"foodContent"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.buttonsdiv}>
          <Button onClick={submitHandler}> 등록 </Button>
        </div>
      </form>
    </div>
  );
}

export default AddingForm;
