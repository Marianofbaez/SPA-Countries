import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css"

export default function Detail(props) {
    console.log(props)
  const dispatch = useDispatch();
  const params = useParams();

//   const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(params.id));
  }, [dispatch]);

  const detalle = useSelector((state) => state.detail);
  console.log(detalle);

  return (
    <div>
      <Link to="/home">
        <button className={styles.button}> Back </button>
      </Link>
      <div className={styles.det}>
        <img src={detalle.flags} className={styles.flag} />
        <h3>{detalle.name}</h3>
        <h3>{detalle.capital}</h3>
        <h3>{detalle.region}</h3>
        <h3>{detalle.subregion}</h3>
        <h3>Area: {detalle.area} km</h3>
        <h3>Population: {detalle.population}</h3>
        <h3>
          Activities:{" "}
          {detalle.activities &&
            detalle.activities.map(
              (e) =>
                e.name +
                ': "Difficulty: ' +
                e.difficulty +
                ", duration: " +
                e.duration +
                ", season: " +
                e.season +
                '." '
            )}
        </h3>
      </div>

      {/* {detalle.length > 0 ? (
        <div className="det">
          <img src={detalle.flag} className='d-flag'/> 
          <h3>{detalle.name}</h3>
          <h3>{detalle.capital}</h3>
          <h3>{detalle.continente}</h3>
          <h3>{detalle.subregion}</h3>
          <h3>Area: {detalle.area} km</h3>
          <h3>Population: {detalle.population}</h3>
          <h3>Activities: {detalle.Activities && detalle.Activities.map(e => e.name+': "Difficulty: '+e.difficulty+', duratyion: '+e.duration+', season: '+e.season+'." ')}</h3>
        </div>
        ) : (
            <h1>Loading...</h1>
        )} */}
    </div>
  );
}
