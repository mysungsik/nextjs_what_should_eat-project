import FoodCard from "../ui/card/foodcard";
import Image from "next/image";
import styles from "./food-item.module.css";

function FoodItem(props) {
  const { id, name, image, price, taste, category, alt } = props;

  return (
    <FoodCard id={id}>
      <div className={styles.imagediv}>
        <h3> {name}</h3>
        <Image src={image} width={500} height={500} alt={alt} priority />
      </div>
      <div className={styles.foodinfodiv}>
        <div>
          <p>
            평균가격 : <span> {price} </span> 원
          </p>
        </div>
        <div>
          <p>
            맛 태그 :<span> # {taste}</span>
          </p>
        </div>
        <div>
          <p>
            카테고리 : <span> # {category}</span>
          </p>
        </div>
      </div>
    </FoodCard>
  );
}

export default FoodItem;
