import Modal from "react-bootstrap/Modal";
import styles from "./modal-for-success-change-password.module.css";
import { useRouter } from "next/router";
import Button from "../card/button";

function ModalUi() {
  const router = useRouter();

  function closeFunction(e) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.maindiv}>
        <Modal.Header>
          <h2>패스워드가 변경되었습니다.</h2>
        </Modal.Header>

        <Modal.Body>
          <p>로그인 페이지로 이동합니다.</p>
        </Modal.Body>

        <Button onClick={closeFunction}>메인페이지로 이동</Button>
      </div>
    </div>
  );
}

export default ModalUi;
