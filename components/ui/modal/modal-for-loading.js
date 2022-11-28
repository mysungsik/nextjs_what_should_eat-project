import styles from "./modal-for-loading.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

function ModalUi() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.maindiv}>
        ...loading
        <Image
          src={"/image/main-background/Discuss.gif"}
          alt={"loading"}
          height={100}
          width={100}
        />
      </div>
    </div>
  );
}

export default ModalUi;
