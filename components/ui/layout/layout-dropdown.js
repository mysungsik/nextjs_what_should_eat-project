import Link from "next/link";
import styles from "./layout-dropdown.module.css";

function DropDown() {
  return (
    <ul className={styles.dropdown}>
      <Link href={"/"}>
        <li>카테고리별</li>
      </Link>
      <Link href={"/"}>
        <li>태그별</li>
      </Link>
      <Link href={"/"}>
        <li>랜덤 선택기</li>
      </Link>
    </ul>
  );
}

export default DropDown;
