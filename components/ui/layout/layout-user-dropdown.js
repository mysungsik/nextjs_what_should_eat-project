import Link from "next/link";
import styles from "./layout-dropdown.module.css";
import { useSession } from "next-auth/react";

function DropDown() {
  const { data: session, status } = useSession();
  return (
    <ul className={styles.dropdown}>
      <Link href={"/userdetail/" + session.user.email}>
        <li>내 정보</li>
      </Link>
      <Link href={"/userdetail/favoritefoods"}>
        <li>내 음식</li>
      </Link>
      <Link href={"/"}>
        <li>랜덤 선택기</li>
      </Link>
    </ul>
  );
}

export default DropDown;
