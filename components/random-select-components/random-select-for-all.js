import Button from "../ui/card/button";
import FoodDetailForm from "../food-detail-components/food-detail-form";
import { useState } from "react";
import styles from "./random-select.module.css";

function RandomSelectComponent(props) {
  const { foodData } = props;
  const [randomFood, setRandomFood] = useState();
  const [showFood, setShowFood] = useState(false);

  let randomNumber;

  function randomSelect() {
    randomNumber = Math.ceil(Math.random() * foodData.length);

    setRandomFood(foodData[randomNumber - 1]);
    setShowFood(true);
  }

  return (
    <div className={styles.maindiv}>
      {!showFood && (
        <div>
          <h2> 이 음식은 어떠신가요?</h2>
          <p> 모든 음식중 하나만 골라드립니다 </p>
        </div>
      )}
      <Button onClick={randomSelect}> 랜덤!</Button>
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
