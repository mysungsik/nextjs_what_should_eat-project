import Link from "next/link";
import styles from "./layout-header-for-web.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import DropDown from "./layout-dropdown";
import UserDropDown from "./layout-user-dropdown";
import Image from "next/image";

function LayoutHeaderForWeb(props) {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);

  let authenticatedId;
  if (session) {
    authenticatedId = session.user.email;
  }

  function showDropDown() {
    setShow(true);
  }

  function closeDropDown() {
    setShow(false);
  }

  function showUserDropDown() {
    setShowUser(true);
  }
  function hideUserDropDown() {
    setShowUser(false);
  }

  function signoutFunction() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <div>
      <header className={styles.headerForWeb}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image
              src={"/image/layout-header/icons8-chicken-box-64.png"}
              width={70}
              height={70}
              alt={"logo"}
            />
          </Link>
        </div>
        <ul>
          {authenticatedId === "admin@admin.com" && (
            <li>
              <Link href={"/allfoods/adding"}> 추가페이지 </Link>
            </li>
          )}

          {status === "authenticated" && authenticatedId !== "admin@admin.com" && (
            <li
              onMouseOver={showUserDropDown}
              onMouseLeave={hideUserDropDown}
              className={styles.userDropDown}
            >
              반갑습니다 {session.user.email} 님!
              <div onMouseLeave={hideUserDropDown}>
                {showUser && <UserDropDown />}
              </div>
            </li>
          )}
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
            <Link href={"/calories"}> 칼로리계산기</Link>
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
    </div>
  );
}

export default LayoutHeaderForWeb;
