import Button from "../ui/card/button";
import FoodDetailForm from "../food-detail-components/food-detail-form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./random-select.module.css";

function RandomSelectComponent(props) {
  const { data: session, status } = useSession();
  const { foodData } = props;
  const [randomFood, setRandomFood] = useState();
  const [showFood, setShowFood] = useState(false);
  const [noData, setNoData] = useState(false);

  let randomNumber;

  function randomSelect() {
    if (foodData.length == 0) {
      setNoData(true);
      return;
    }
    randomNumber = Math.ceil(Math.random() * foodData.length);

    setRandomFood(foodData[randomNumber - 1]);
    setShowFood(true);
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
