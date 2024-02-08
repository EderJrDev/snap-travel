import React from "react";
//CSS
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Logo <span>Ali</span>
      </h2>
      <p>
        Este projeto é um blog para registro de viagens feito com React no
        front-end e Firebase no back-end, espero que tenha gostado
      </p>
      <Link to="/posts/create" className="btn">
        Criar registro
      </Link>
    </div>
  );
};

export default About;
