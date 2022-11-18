import styles from "./login-form.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../ui/notification/notification";

function LoginForm() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  if (status === "loading") {
    return <div>...loading</div>;
  }
  if (status === "authenticated") {
    router.replace("/");
  }

  function closeNotification() {
    setMessage(null);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (status === "unauthenticated") {
      setMessage(result.error);
    }
    if (result.error == null) {
      router.replace("/");
    }
  }

  return (
    <div className={styles.maindiv}>
      <form className={styles.loginform}>
        <h1> 로그인</h1>
        <div onClick={closeNotification}>
          {message && <Notification message={message} state={status} />}
        </div>
        <div>
          <label htmlFor="email">이메일을 입력하세요</label>
          <input type={"email"} id={"email"} ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">패스워드를 입력하세요</label>
          <input type={"password"} id={"password"} ref={passwordRef} />
        </div>
        <div className={styles.buttons}>
          <button onClick={submitHandler}> 제출</button>
          <button type="reset"> 취소 </button>
        </div>
        <div className={styles.checkid}>
          <Link href={"/signup"}>아이디가 없으신가요?</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
