import LayoutHeaderForMobile from "./layout-header-for-mobile";
import LayoutHeaderForWeb from "./layout-header-for-web";
import styles from "./layout-header.module.css";

function LayoutHeader() {
  return (
    <div>
      <header className={styles.headerForWeb}>
        <LayoutHeaderForWeb />
      </header>
      <header className={styles.headerForMobile}>
        <LayoutHeaderForMobile />
      </header>
    </div>
  );
}
export default LayoutHeader;
