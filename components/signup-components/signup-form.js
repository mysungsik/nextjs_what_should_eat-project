import styles from "./signup-form.module.css";
import Notification from "../ui/notification/notification";
import Button from "../ui/card/button";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import ModalUi from "../ui/modal/modal-for-signup";
import { useSession } from "next-auth/react";

function SignupForm() {
  const { data: session, status } = useSession();
  const [sendingState, setSendingState] = useState();
  const [message, setMessage] = useState();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  if (status === "loading") {
    return <div>...loading</div>;
  }
  if (status === "authenticated") {
    router.replace("/");
  }

  function closeNotification() {
    setSendingState(null);
  }

  async function createUser(e) {
    e.preventDefault();

    setSendingState("pending"); // 여기까지 하는중 [useState 로, 회원가입시 [전송중, 성공, 실패] notification 화면 안에 표시 (context X)  ]

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

    if (!response.ok) {
      setSendingState(() => "error");
      setMessage("연결 실패");
    }
    const responseData = await response.json();
    setMessage(responseData.message);
    if (responseData.data) {
      setSendingState("success");
    }
  }
  return (
    <div className={styles.maindiv}>
      {sendingState === "success" && <ModalUi />}
      <form className={styles.signupform}>
        <h1> 회원가입</h1>
        <div onClick={closeNotification}>
          {sendingState && (
            <Notification state={sendingState} message={message} />
          )}
        </div>
        <div>
          <label htmlFor="email">이메일을 입력하세요</label>
          <input
            type={"email"}
            id={"email"}
            ref={emailRef}
            required
            placeholder="@를 포함하는 email을 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="password">패스워드를 입력하세요</label>
          <input
            type={"password"}
            id={"password"}
            ref={passwordRef}
            required
            maxLength={10}
            placeholder="4자리 수 이상의 문자를 입력해주세요."
          />
        </div>
        <div>
          <label htmlFor="name">이름을 입력하세요</label>
          <input
            type={"text"}
            id={"name"}
            ref={nameRef}
            required
            placeholder="문자만 가능합니다."
          />
        </div>
        <div className={styles.buttons}>
          <Button onClick={createUser}> 제출</Button>
          <button type="reset"> 취소 </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
