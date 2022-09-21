import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCountryByRegion,
  getCountries,
  orderByName,
  getActivities,
  filterByActivity,
} from "../../actions";
import { Link } from "react-router-dom";
import CountryCard from "../CountryCard/CountryCard";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const actividades = useSelector((state) => state.activities);

  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage; // 6
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); // el slice corta un array, de acuerdo a los parámetros que le demos. acá se van a ir guardando los personajes a renderizar

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    // setCurrentPage(1); //para que vuelva a empezar a paginar
    setOrden(`Ordenado ${e.target.value}`); //línea clave para setear y que haga las modificaciones en el ordenamiento del renderizado
  }

  function handleFilterRegion(e) {
    // cuando se modifica el select, se ejecuta esta función
    dispatch(filterCountryByRegion(e.target.value)); //e.target.value me permite acceder al valor de las acciones de acuerdo al que clickee el usuario
  }
  function handleFilterActivities(e) {
    dispatch(filterByActivity(e.target.value));
  }

  return (
    <div>
      {/* <h1>HOLAAA</h1> */}
      <div>
        <Link to="/activities">
          <button className={styles.containerActivity} >Create activity</button>
        </Link>{" "}
        {/*va a ser un boton*/}
      </div>
      <button onClick={handleClick} className={styles.containerActivity}>Reload all Countries</button>

      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Upward</option>
          <option value="desc">Falling</option>
        </select>

        <select onChange={(e) => handleFilterRegion(e)}>
          <option value="Continents">Continents</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctic</option>
        </select>

        <select onChange={handleFilterActivities}>
          <option>Activity</option>
          {actividades !== "No activities" &&
            actividades.map((e) => {
              return (
                <option value={e.name} key={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>

        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />

        <SearchBar />

        <div className={styles.containerCountry}>
          {currentCountries?.map((e) => {
            return (
              <div>
                <Link to={"/home/" + e.cca3}>
                  <CountryCard
                    name={e.name}
                    flags={e.flags}
                    region={e.region}
                    key={e.cca3 ? e.cca3 : "nnn"}
                    cca3={e.cca3}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
