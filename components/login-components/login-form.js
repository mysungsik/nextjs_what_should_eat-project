import styles from "./login-form.module.css";
import Link from "next/link";

function LoginForm() {
  return (
    <div className={styles.maindiv}>
      <form className={styles.loginform}>
        <h1> 로그인</h1>
        <div>
          <label htmlFor="email">이메일을 입력하세요</label>
          <input type={"email"} id={"email"} />
        </div>
        <div>
          <label htmlFor="password">패스워드를 입력하세요</label>
          <input type={"password"} id={"password"} />
        </div>
        <div className={styles.buttons}>
          <button> 제출</button>
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
