import Modal from "react-bootstrap/Modal";
import styles from "./modal-for-signup.module.css";
import { useRouter } from "next/router";
import Button from "../card/button";

function ModalUi() {
  const router = useRouter();

  function closeFunction() {
    router.replace("/login");
  }
  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.maindiv}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>회원가입이 성공적으로 진행되었습니다.</h2>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>로그인 페이지로 이동합니다.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={closeFunction}>로그인페이지로 이동</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default ModalUi;
