import Link from "next/link";
import styles from "./layout-header.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import DropDown from "./layout-dropdown";

function LayoutHeader(props) {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);

  function showDropDown() {
    setShow(true);
  }

  function closeDropDown() {
    setShow(false);
  }

  function signoutFunction() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <header className={styles.header}>
      <div>
        <Link href={"/"}>
          <h1> Logo</h1>
        </Link>
      </div>
      <ul>
        <li className={styles.li}>
          <Link href={"/"}> 홈페이지</Link>
        </li>
        {status === "unauthenticated" && (
          <li className={styles.li}>
            <Link href={"/login"}> 로그인</Link>
          </li>
        )}
        <li className={styles.li} onMouseOver={showDropDown}>
          <div onMouseLeave={closeDropDown}>
            뭐먹지
            {show && <DropDown />}
          </div>
        </li>
        <li className={styles.li}>
          <Link href={"/"}> 칼로리계산기</Link>
        </li>
        <li className={styles.li}>
          <Link href={"contact"}> Contact</Link>
        </li>
        {status === "authenticated" && (
          <li className={styles.li}>
            <button className={styles.logout} onClick={signoutFunction}>
              로그아웃
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default LayoutHeader;
