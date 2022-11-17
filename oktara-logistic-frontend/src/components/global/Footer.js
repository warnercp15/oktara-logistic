import styles from "../../styles/components/global/Footer.module.scss";

export default function Footer({ children }) {
  return <footer className={styles.footer}>&copy; 2022 Oktara Logistic</footer>;
}