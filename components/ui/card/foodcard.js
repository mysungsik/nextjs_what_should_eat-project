import styles from "./foodcard.module.css";
import Link from "next/link";

function FoodCard(props) {
  const { id } = props;
  return (
    <div className={styles.foodcard}>
      <Link href={`/${id}`}>
        <div>{props.children}</div>
      </Link>
    </div>
  );
}

export default FoodCard;
