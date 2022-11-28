import Link from "next/link";
import Image from "next/image";
import styles from "./layout-footer.module.css";

function LayoutFooter(props) {
  return (
    <footer className={styles.footer}>
      <ul className={styles.ul}>
        <div className={styles.innerSite}>
          <li className={styles.logo}>
            <Link href={"/"}>
              <Image
                src={"/image/layout-header/icons8-chicken-box-64.png"}
                width={80}
                height={80}
                alt={"logo"}
              />
            </Link>
          </li>
          <li className={styles.howToUse}>
            <Link href={"/greeting"}> HowtoUse</Link>
          </li>
          <li>
            <Link href={"/contact"}> Contact</Link>
          </li>
        </div>
        <li className={styles.contact}>
          <div>
            <Link href={"https://github.com/mysungsik/nextjs_personal_project"}>
              <Image
                src={"/image/footer/GitHub-Logo.png"}
                alt={"github"}
                width={40}
                height={35}
              />
            </Link>
          </div>
          <div>
            <Link href={"https://dive-into-frontend.tistory.com/"}>
              <Image
                src={"/image/footer/tistory.png"}
                alt={"blog"}
                width={40}
                height={35}
              />
            </Link>
          </div>
          <div>Ms-What&copy;</div>
        </li>
      </ul>
    </footer>
  );
}

export default LayoutFooter;
