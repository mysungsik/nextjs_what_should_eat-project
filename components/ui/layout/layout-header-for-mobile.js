import Link from "next/link";
import Image from "next/image";
import styles from "./layout-header-for-mobile.module.css";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";

function LayoutHeaderForMobile(props) {
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const router = useRouter();

  function showModal() {
    setModal((prev) => !prev);
  }
  function showDropDown() {
    setShow((prev) => !prev);
  }

  function showUserDropDown() {
    setShowUser((prev) => !prev);
  }

  function signoutFunction() {
    signOut({ callbackUrl: "/" });
  }

  let authenticatedId;
  if (session) {
    authenticatedId = session.user.email;
  }

  return (
    <header className={styles.headerForMobile}>
      <ul className={styles.ul}>
        <li>
          <Link href={"/"}>
            <h1>Logo</h1>
          </Link>
        </li>
        <li onClick={showModal}>
          <Image
            src={"/image/layout-header/icons8-hamburger-50.png"}
            alt={"ham"}
            width={50}
            height={50}
          ></Image>
        </li>
      </ul>
      {modal && (
        <div className={styles.mainmodal}>
          <div className={styles.background}></div>
          <div className={styles.maindiv}>
            <h2>메뉴</h2>
            {status === "authenticated" && (
              <div onClick={showUserDropDown}>
                반갑습니다 {session.user.email} 님!
                {showUser && (
                  <div className={styles.userDropdown}>
                    <ul>
                      <Link href={"/userdetail/" + session.user.email}>
                        <li onClick={showModal}>내 정보</li>
                      </Link>
                      <Link href={"/userdetail/favoritefoods"}>
                        <li onClick={showModal}>내 음식</li>
                      </Link>
                      <Link href={"/userdetail/random"}>
                        <li onClick={showModal}>랜덤 선택기</li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <ul>
              {authenticatedId === "admin@admin.com" && (
                <li>
                  <Link href={"/allfoods/adding"} onClick={showModal}>
                    추가페이지
                  </Link>
                </li>
              )}
              {status === "unauthenticated" && (
                <li className={styles.li} onClick={showModal}>
                  <Link href={"/login"}> 로그인</Link>
                </li>
              )}
              <li onClick={showDropDown}>
                <div>뭐먹지</div>
                {show && (
                  <div className={styles.dropdown}>
                    <ul>
                      <Link href={"/allfoods"}>
                        <li onClick={showModal}>카테고리별</li>
                      </Link>
                      <Link href={"/allfoods/tags"}>
                        <li onClick={showModal}>태그별</li>
                      </Link>
                      <Link href={"/random"}>
                        <li onClick={showModal}>랜덤 선택기</li>
                      </Link>
                    </ul>
                  </div>
                )}
              </li>
              <li className={styles.li} onClick={showModal}>
                <Link href={"/calories"}> 칼로리계산기</Link>
              </li>
              <li className={styles.li} onClick={showModal}>
                <Link href={"/contact"}> Contact</Link>
              </li>
              {status === "authenticated" && (
                <li className={styles.li}>
                  <button className={styles.logout} onClick={signoutFunction}>
                    로그아웃
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default LayoutHeaderForMobile;
