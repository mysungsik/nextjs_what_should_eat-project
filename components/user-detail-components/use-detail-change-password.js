import { useRef, useState } from "react";
import styles from "./use-detail-change-password.module.css";
import SuccessModal from "../ui/modal/modal-for-success-change-password";
import Button from "../ui/card/button";

function ChangePassword(props) {
  const currentRef = useRef();
  const newRef = useRef();
  const { useremail } = props;
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const currentPassword = currentRef.current.value;
    const newPassword = newRef.current.value;

    const patchPassword = { useremail, currentPassword, newPassword };

    console.log(patchPassword);
    const response = await fetch("/api/userdetail/change-password", {
      method: "PATCH",
      body: JSON.stringify(patchPassword),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    setMessage(responseData.message);
    if (responseData.data) {
      setSuccess(true);
    }
  }
  return (
    <form className={styles.changeInfo}>
      <div> {success && <SuccessModal />} </div>
      <div className={styles.error}>{message && <p> {message}</p>}</div>
      <div>
        <label htmlFor="currentPassword"> 현재 비밀번호</label>
        <input type={"password"} id={"currentPassword"} ref={currentRef} />
      </div>
      <div>
        <label htmlFor="newPassword" className={styles.newpassword}> 변경할 비밀번호</label>
        <input type={"password"} id={"newPassword"} ref={newRef} />
      </div>
      <div className={styles.buttondiv}>
        <Button onClick={submitHandler}> 확인 </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
