import styles from "./user-detail-form.module.css";

import { useState } from "react";
import ChangePassword from "./use-detail-change-password";

function UserDetailComponent(props) {
  const { useremail, username } = props;
  const [showForm, setShowForm] = useState(false);
  function toggleForm() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className={styles.maindiv}>
      <div>
        <h1> 내정보 </h1>
        <ul>
          <li>
            <div className={styles.info}>
              <h3>아이디</h3> <p> {useremail}</p>
            </div>
          </li>
          <li>
            <div className={styles.info}>
              <h3>이름</h3> <p> {username}</p>
            </div>
          </li>
        </ul>
        <h3 className={styles.changeBtn} onClick={toggleForm}>
          비밀번호 변경
        </h3>
        {showForm && <ChangePassword useremail={useremail} />}
      </div>
    </div>
  );
}

export default UserDetailComponent;
