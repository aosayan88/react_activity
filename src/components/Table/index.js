/* REACT */
import React from 'react';

/*  Table Component */
const Table = ({ table_data, columns, onEdit, onDelete, onMove }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((item, index) => {
                        return (
                            <th key={index}>{item}</th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {/* loop the table data to set each data in a table row */}
                {table_data.map(simple_form_data => {
                    let arrow_icon = simple_form_data.designated_table === 0 ? "arrow_down_icon" : "arrow_up_icon";
                    let { id, first_name, last_name, email, designated_table } = simple_form_data;

                    return (
                        <tr key={id} id={id}>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{email}</td>
                            <td>
                                <button onClick={() => onEdit(simple_form_data)} id="edit_data_btn" type="button"><span>Edit</span></button>
                                <button onClick={() => onMove(id, designated_table)} type="button"><span className={arrow_icon}></span></button>
                                <button onClick={() => onDelete(id)} id="delete_data_btn" type="button"><span className="delete_icon"></span></button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
 
export default Table;