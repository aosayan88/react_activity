/* REACT */
import React from 'react'

/**
 * This component class is being called on the ../../Main.js
 * @author Alfie
 * Last Updated Date: July 29, 2022
 */
const Button = ({ type, id, label, onClick }) => {
    return (
        <button type={type} id={id} onClick={onClick}>{label}</button>
    );
}
 
export default Button;