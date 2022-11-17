import Link from "next/link";
import Image from "next/image";
import styles from "./layout-footer.module.css";

function LayoutFooter(props) {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <Link href={"/"}>
            <h1>Logo</h1>
          </Link>
        </li>
        <li>
          <Link href={"/"}> Terms</Link>
        </li>
        <li>
          <Link href={"/"}> Contact</Link>
        </li>
        <li className={styles.contact}>
          <div>
            <Link href={"/"}>
              <Image
                src={"/image/footer/GitHub-Logo.png"}
                alt={"github"}
                width={40}
                height={35}
              />
            </Link>
          </div>
          <div>
            <Link href={"/"}>
              <Image
                src={"/image/footer/tistory.png"}
                alt={"blog"}
                width={40}
                height={35}
              />
            </Link>
          </div>
        </li>
        <li>Ms-What&copy;</li>
      </ul>
    </footer>
  );
}

export default LayoutFooter;
