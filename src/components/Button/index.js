/* REACT */
import React from 'react'

/* Button Component */
const Button = ({ type, id, label, onClick }) => {
    return (
        <button type={type} id={id} onClick={onClick}>{label}</button>
    );
}
 
export default Button;