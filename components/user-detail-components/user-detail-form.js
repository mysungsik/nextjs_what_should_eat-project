import styles from "./user-detail-form.module.css";
import Button from "../ui/card/button";
import Favorites from "./favorite-foods";
import { useState } from "react";

function UserDetailComponent(props) {
  const { useremail, username } = props;
  const [showFavorites, setShowFavorites] = useState(false);

  function showToggle() {
    setShowFavorites((prev) => !prev);
  }

  return (
    <div className={styles.maindiv}>
      <div>
        <p> 아이디 {useremail}</p>
        <p>이름 {username}</p>
      </div>
    </div>
  );
}

export default UserDetailComponent;
