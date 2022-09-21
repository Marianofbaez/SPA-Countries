import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity, getCountries } from "../../actions";
import styles from "./CreateActivity.module.css"

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "The difficulty must be between 1 y 5";
  }
  if (!input.difficulty) {
    errors.difficulty = "Complete difficulty";
  }
  if (!input.duration) {
    errors.duration = "Complete duration";
  }

  return errors;
}

export default function CreateActivity() {
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    idCountry: [],
  });
  const [errors, setErrors] = useState({});
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.countries2);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getCountries());
    }
  }, []);

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      idCountry: [...input.idCountry, e.target.value],
    });
  }

  function handleSelect2(e) {
    setInput({
      ...input,
      season: [...input.season, e.target.value],
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (
      !Object.keys(errors).length &&
      input.season.length > 0 &&
      input.idCountry.length > 0
    ) {
      dispatch(createActivity(input));
      alert("Activity created");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        idCountry: [],
      });
    } else {
      alert("complete all fields ");
    }
  }

  return (
    <div>
      <Link to="/home">
        <button className={styles.backButton}> Back </button>
      </Link>
      <form onSubmit={handleOnSubmit} className={styles.cre}>
        <div className={styles.div}>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            key="name"
            name="name"
            onChange={handleOnChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className={styles.div}>
          <label>Difficulty:</label>
          <input
            type="number"
            max={5}
            min={1}
            value={input.difficulty}
            key="difficulty"
            name="difficulty"
            onChange={handleOnChange}
          />
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>
        <div className={styles.div}>
          <label>Duration:</label>
          <input
            type="text"
            value={input.duration}
            key="duration"
            name="duration"
            onChange={handleOnChange}
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>
        <div className={styles.div}>
          <label>Season:</label>
          <select onChange={handleSelect2} key="season">
            <option></option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
        </div>
        <ul>
          <li className={styles.li}>{input.season.map((e) => e + ", ")}</li>
        </ul>
        {/* <div className="div">
          <label>Country/ies:</label>
          <select onChange={ e => handleSelect(e)} key="idCountry">
            <option></option>
            {countries?.map((e) => {
              return (
                <option value={e.cca3} key={e.id ? e.id : "nnn"}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div> */}

        <div>
          <label>Country/ies:</label>
          <select onChange={handleSelect} key="idCountry">
            <option></option>
            {countries.map((e) => {
              return (
                <option value={e.cca3} key={e.cca3}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <ul>
          <li className={styles.li}>{input.idCountry.map((e) => e + ", ")}</li>
        </ul>
        <button type="submit" onClick={handleOnSubmit} className={styles.createButton}>
          Create Activity
        </button>
      </form>
    </div>
  );
}
