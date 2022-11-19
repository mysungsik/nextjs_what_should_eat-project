import FoodItem from "./food-item";
import styles from "./food-list.module.css";

function FoodList(props) {
  const { foodData } = props;

  return (
    <ul className={styles.ul}>
      {foodData.map((d) => (
        <li key={d.id}>
          <FoodItem
            id={d.id}
            name={d.name}
            image={d.image}
            price={d.price}
            taste={d.taste}
            category={d.category}
            alt={d.alt}
          />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
