import React, { useEffect, useState, useRef } from "react";

import api from "../../service/api";
import "./index.css";

export default function Detail() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState();
  const [error, setError] = useState();
  const inputEl = useRef(null);

  useEffect(() => {
    api
      .get("/summary")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.error(error);
        window.location.reload();
      });
  }, []);

  async function searchCountry(name) {
    if (!name) {
      inputEl.current.focus();
      setCountry(null);
      setError("Preencha o campo");
      return false;
    } else {
      if (name === "brasil") {
        name = "brazil";
      }

      const { Countries } = countries;

      const result = await Countries.find((item) => item.Slug.match(name));
      setCountry(result);
      setError("");
    }
  }

  function handleCountry(country) {
    if (country) {
      const {
        Country,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
      } = country;

      const date = country.Date;

      return (
        <div className="country-search">
          <h4>{Country}</h4>
          <div className="data">
            <p>
              New Confirmed:
              <span>{new Intl.NumberFormat("pt-br").format(NewConfirmed)}</span>
            </p>
            <p>
              New Deaths:
              <span>{new Intl.NumberFormat("pt-br").format(NewDeaths)}</span>
            </p>
            <p>
              New recuperados:
              <span>{new Intl.NumberFormat("pt-br").format(NewRecovered)}</span>
            </p>
            <p>
              Total Confirmed:
              <span>
                {new Intl.NumberFormat("pt-br").format(TotalConfirmed)}
              </span>
            </p>
            <p>
              Total Deaths:
              <span>{new Intl.NumberFormat("pt-br").format(TotalDeaths)}</span>
            </p>
            <p>
              Total Recovered:
              <span>
                {new Intl.NumberFormat("pt-br").format(TotalRecovered)}
              </span>
            </p>
            <p>
              Current date:
              <span>{new Date(`${date}`).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      );
    }
  }

  function handleCountryGlobal(countries, country) {
    const { Global } = countries;
    if (!country && Global) {
      const {
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
      } = Global;
      const date = countries.Date;

      return (
        <div className="country-global">
          <h4>World</h4>
          <div className="data">
            <p>
              New Confirmed:
              <span>{new Intl.NumberFormat("pt-br").format(NewConfirmed)}</span>
            </p>
            <p>
              New Deaths:
              <span>{new Intl.NumberFormat("pt-br").format(NewDeaths)}</span>
            </p>
            <p>
              New Recovered:
              <span>{new Intl.NumberFormat("pt-br").format(NewRecovered)}</span>
            </p>
            <p>
              Total Confirmed:
              <span>
                {new Intl.NumberFormat("pt-br").format(TotalConfirmed)}
              </span>
            </p>
            <p>
              Total Deaths:
              <span>{new Intl.NumberFormat("pt-br").format(TotalDeaths)}</span>
            </p>
            <p>
              Total Recovered:
              <span>
                {new Intl.NumberFormat("pt-br").format(TotalRecovered)}
              </span>
            </p>
            <p>
              Current date:
              <span>{new Date(`${date}`).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="content">
      <div className="search">
        <input
          type="text"
          ref={inputEl}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <span className="warning">
          Enter the country name in English when searching!
        </span>
        <span className="error">{error}</span>
        <button
          onClick={() => {
            searchCountry(search);
          }}
        >
          SEARCH
        </button>
      </div>
      <div>
        {handleCountry(country)}
        {handleCountryGlobal(countries, country)}
      </div>
    </div>
  );
}
