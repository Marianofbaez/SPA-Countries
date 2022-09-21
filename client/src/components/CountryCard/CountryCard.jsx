import React from "react";
import styles from './CountryCard.module.css'

export default function CountryCard({ name, cca3, flags, region }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <h5 className={styles.name}>{cca3}</h5>
      <img src={flags} className={styles.flag} />
      <h6>{region}</h6>
    </div>
  );
}