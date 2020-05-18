import React, { useState } from "react";

import "./index.css";
import Detail from "../components/CountryDetail";
import Img from "../assets/covid.svg";

export default function Home() {
  const [animate, setAnimate] = useState();

  const animeteScroll = () => {
    const windowTop = window.pageYOffset;
    if (windowTop >= 200) {
      setAnimate("animate");
    } else {
      setAnimate("");
    }
  };

  window.addEventListener("scroll", () => {
    animeteScroll();
  });
  return (
    <div className="container">
      <div className="header">
        <img src={Img} alt="Covid19" />
        <h2>See what's happening around the world</h2>
      </div>
      <div className="details">
        <Detail />
      </div>
      <div className="card-infos">
        <p data-anime="left" className={animate}>
          <span>What is the COVID-19?</span>The COVID-19 is a disease caused by
          SARS-CoV-2 coronavirus, which presents a clinical picture that varies
          from asymptomatic infections to severe respiratory conditions. For
          more information click on the link
          <a href="https://coronavirus.saude.gov.br/sobre-a-doenca#o-que-e-covid">
            More...
          </a>
        </p>
        <p data-anime="left" className={animate}>
          All of this data was provided by Application Programming Interface
          <a href="https://covid19api.com/"> Covid19api</a>, access the website
          is to check the documentation.
        </p>
      </div>
      <div className="footer">
        <p>
          Created by
          <a href="https://www.linkedin.com/in/alexsandrogomes/">
            &lt;Alexsandro Gomes/&gt;
          </a>
        </p>
      </div>
    </div>
  );
}
