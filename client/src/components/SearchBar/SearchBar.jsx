import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getCountryByName} from '../../actions';
// import './Home.css'

export default function Search(){
    const[input, setInput] = useState('');
    const dispatch = useDispatch();

    function handleChange(e){
        setInput(e.target.value)
    }
    function handleOnClick(e){
        e.preventDefault()
        dispatch(getCountryByName(input))
    }

    return (
         <div>
             <input type='text' onChange={handleChange} placeholder='Country...'  className="input"/>
             <button onClick={handleOnClick} className='c-activity' >Search</button>
         </div>
     )
}