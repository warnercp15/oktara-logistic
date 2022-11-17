import { Link } from "react-router-dom";

import Menu from "./Menu";

import styles from "../../styles/components/global/Header.module.scss";

export default function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          Oktara
          <span className={styles["logo-secondary"]}>Logistic</span>
        </Link>
        <Menu />
      </nav>
    </header>
  );
}
