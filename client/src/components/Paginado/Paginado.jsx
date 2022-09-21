import React from "react";

export default function Paginado ({countriesPerPage, allCountries, paginado}){ // propiedades que me traigo del componente home
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allCountries / countriesPerPage); i++) { //Math.ceil redondea para arriba
        pageNumbers.push(i+1);
    }
    return (
        <nav >
             <ul>
                {pageNumbers.map((el) => {
                   if(el !== 0){
                       return <button key={el} onClick={() => paginado(el)}>{el}</button>
                   }
                })}
            </ul>
        </nav>
    )
}