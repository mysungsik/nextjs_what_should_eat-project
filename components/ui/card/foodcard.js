import styles from "./foodcard.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

function FoodCard(props) {
  const { data: session, status } = useSession();
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
