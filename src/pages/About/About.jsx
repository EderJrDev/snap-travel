import { Link } from "react-router-dom";
//CSS
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o<span> Snap Travel</span>
      </h2>
      <p>
        O <span>Snap Travel</span> é uma aplicação web que coloca as
        experiências de viagem na palma da sua mão. Com uma interface intuitiva
        e um design moderno, criei um espaço onde os usuários podem explorar uma
        variedade de viagens, acompanhadas de suas histórias, experiências e até
        mesmo imagens inspiradoras. Mas a diversão não para por aí! Com o
        <span> Snap Travel</span>, você também pode criar sua própria conta na
        aplicação. Isso significa que você pode compartilhar suas próprias
        aventuras de viagem, criando posts personalizados que capturam os
        momentos mais memoráveis das suas jornadas. E não se preocupe, você tem
        total controle sobre seus posts. Você pode editá-los para garantir que
        estejam perfeitos ou até mesmo excluí-los, se desejar.
      </p>
      <p>
        Então, como construí essa maravilha? Bem, mergulhei fundo no mundo do
        React JS. Utilizei todos os conceitos essenciais dessa tecnologia, desde
        o controle de estados até a criação de hooks, passando pela
        componentização e gerenciamento de propriedades. O resultado? Um projeto
        simples, porém muito bem executado. Para armazenar todas essas
        informações valiosas, recorri ao Firebase. E para garantir a segurança e
        a qualidade da aplicação, apliquei testes unitários utilizando o Vitest
        e o React Testing Library. Assim, você pode explorar o
        <span> Snap Travel</span> com tranquilidade, sabendo que sua experiência
        está em boas mãos. Não tenho dúvidas de que o<span> Snap Travel</span> é
        a melhor escolha quando se trata de visualizar viagens e compartilhar
        suas próprias aventuras.
      </p>
      <p>
        Então, não perca tempo e embarque nessa jornada comigo! E por último,
        mas não menos importante, adoraria ouvir seus feedbacks! Conheça mais
        sobre mim em meu site:{" "}
        <a href="https://ederjr.vercel.app/" target="_blank" rel="noreferrer">
          Dev Eder Jr
        </a>{" "}
      </p>
      <Link to="/posts/create" className="btn">
        Criar registro
      </Link>
    </div>
  );
};

export default About;
