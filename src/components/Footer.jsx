//CSS
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre a sua viagem!</h3>
      <p>
        Snap Travel &copy; 2024 by{" "}
        <a href="https://ederjr.vercel.app/" target="_blank" rel="noreferrer">
          dev
        </a>
      </p>
    </footer>
  );
};

export default Footer;
