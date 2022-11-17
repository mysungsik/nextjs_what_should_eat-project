import Link from "next/link";
import styles from "./layout-header.module.css";

function LayoutHeader(props) {
  return (
    <header className={styles.header}>
      <div>
        <Link href={"/"}>
          <h1> Logo</h1>
        </Link>
      </div>
      <ul>
        <li>
          <Link href={"/"}> 홈페이지</Link>
        </li>
        <li>
          <Link href={"/login"}> 로그인</Link>
        </li>
        <li>
          <Link href={"/"}> 뭐먹지 </Link>
        </li>
        <li>
          <Link href={"/"}> 칼로리계산기</Link>
        </li>
        <li>
          <Link href={"/"}> Contact</Link>
        </li>
      </ul>
    </header>
  );
}

export default LayoutHeader;
