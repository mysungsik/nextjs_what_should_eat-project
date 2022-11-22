// 입력기능이 담긴 form
import styles from "./caculate-selector.module.css";
import { useState, useEffect } from "react";

function CaloireFoodSeletor(props) {
  const { foodData } = props;
  const [filteredData, setFilterdData] = useState([]); // 카테고리 선택하면, filter 되는 Data 정리
  const [foodValue, setFoodValue] = useState(); // 음식을 눌렀을때, 그 음식에 대한 foodid 선택
  const [foodInCalculator, setFoodInCalculator] = useState([]); // 총 누른 음식들의 Data를 Array 형태로 정리

  const [totalCalories, setTotalCalorie] = useState(0);

  // 전체 Data를 순서대로 정렬
  const sortedFoodData = filteredData.sort((A, B) =>
    A.name > B.name ? 1 : -1
  );

  // foodValue 가 바뀔때, [기존 + 새 foodid로 가져온 foodData] 를 삽입
  useEffect(() => {
    if (foodValue) {
      setFoodInCalculator((prev) => [
        ...prev,
        foodData.find((food) => food.id === String(foodValue)),
      ]);
    }
  }, [foodValue]);

  // [reset 로직]
  function resetHandler() {
    setFoodInCalculator([]);
    setTotalCalorie(0);
  }

  // [필터링 로직] 카테고리 눌렀을때,
  function filterFoodWithCategory(category) {
    const filterd = foodData.filter((food) => food.category === category);
    setFilterdData(filterd);
  }

  // [계산기 로직]  계산을 위해 DOM 에 접근
  //  1. "추가버튼은 무한정 증가가 가능하므로, useRef 나, useState 가 아닌, 직접 DOM 에 접근한다"
  //  2. "값을 바꿀 수 있는 섭취량 변화에 DOM 을 맞춰 onChange 트리거를 활용해 자동계산을 시킨다."
  //  3. 자동계산된 칼로리 값 전부를 "querySelectorAll" 로 DOM 에 접근
  //  4. for 를 사용하여, 자동계산된 칼로리 값 전부를 "새로만든 Array 에 push하고"
  //  5. .reduce() 를 이용하여, 전부 합산시켜
  //  6. useState 를 통해 만든 totalCalorie 에 집어넣어
  //  7. 총 칼로리의 value 에 넣어주었다.

  function calculate(e) {
    let foodCalorie = e.target.parentElement.children[2].children[0].value;
    let quantity = e.target.parentElement.children[1].value;

    let total = foodCalorie * quantity;

    e.target.parentElement.children[3].children[0].value = total;

    const alltotals = document.querySelectorAll(".total");

    let newArray = [];
    for (const alltotal of alltotals) {
      newArray.push(alltotal.value);
    }
    let totalCalories = newArray.reduce((sum, current) => +sum + +current);

    setTotalCalorie(totalCalories);
  }

  return (
    <main className={styles.maindiv}>
      <section className={styles.selector}>
        <h1> 선택기 </h1>
        <div>
          <h4> 카테고리</h4> {/* 1  카테고리 선택*/}
          <ul>
            <li onClick={() => filterFoodWithCategory("다이어트")}>다이어트</li>
            <li onClick={() => filterFoodWithCategory("한식")}>한식</li>
            <li onClick={() => filterFoodWithCategory("양식")}>양식</li>
            <li onClick={() => filterFoodWithCategory("일식")}>일식</li>
            <li onClick={() => filterFoodWithCategory("베트남")}>베트남</li>
            <li onClick={() => filterFoodWithCategory("중식")}>중식</li>
            <li onClick={() => filterFoodWithCategory("디저트")}>디저트</li>
          </ul>
        </div>
        <div>
          <h4> 음식 </h4>

          {/* 2.  카테고리를 선택해, filteredData 가 생겼다면, 그 하위 음식들 선택*/}

          {filteredData && (
            <ul>
              {sortedFoodData.map((food) => (
                <li
                  key={food.id}
                  value={food.id}
                  onClick={(e) => setFoodValue(e.target.value)}
                >
                  {food.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className={styles.calculator}>
        <h2> 계산기</h2>
        <div>
          <ul>
            <li> 선택음식</li>
            <li> 섭취량 </li>
            <li> 100g 당 칼로리</li>
            <li> 섭취 칼로리</li>
          </ul>

          {/* 3.  선택해놓은, 음식들의 데이터를 계산기에 생성*/}
          {foodInCalculator.map((food) => (
            <ul key={food.id}>
              <li>{food.name}</li>
              <input
                type={"number"}
                step={1}
                defaultValue={0}
                onChange={(e) => calculate(e)}
              />
              <li>
                <input type={"number"} readOnly value={food.calorie} />
              </li>
              <li>
                <input
                  type={"number"}
                  readOnly
                  className={"total"}
                  defaultValue={0}
                />
              </li>
            </ul>
          ))}
          <hr />
          <div>총 칼로리</div>
          <input type={"number"} value={totalCalories} readOnly />
        </div>
        <button onClick={resetHandler}> 초기화 </button>
      </section>
    </main>
  );
}

export default CaloireFoodSeletor;
