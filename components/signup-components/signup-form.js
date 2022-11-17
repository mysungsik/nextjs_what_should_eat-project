import styles from "./signup-form.module.css";
import Notification from "../ui/notification/notification";
import { useRef, useState } from "react";

function SignupForm() {
  const [sendingState, setSendingState] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  async function createUser(e) {
    e.preventDefault();

    setSendingState("pending"); // 여기까지 하는중

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    const insertUserData = {
      email,
      password,
      name,
    };

    const response = await fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify(insertUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
  }
  return (
    <div className={styles.maindiv}>
      <form className={styles.signupform}>
        <h1> 회원가입</h1>
        <div>
          <label htmlFor="email">이메일을 입력하세요</label>
          <input type={"email"} id={"email"} ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">패스워드를 입력하세요</label>
          <input type={"password"} id={"password"} ref={passwordRef} />
        </div>
        <div>
          <label htmlFor="name">이름을 입력하세요</label>
          <input type={"text"} id={"name"} ref={nameRef} />
        </div>
        <div className={styles.buttons}>
          <button onClick={createUser}> 제출</button>
          <button type="reset"> 취소 </button>
        </div>
      </form>
      <Notification />
    </div>
  );
}

export default SignupForm;
