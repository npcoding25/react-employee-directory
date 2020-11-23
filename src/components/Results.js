import React from "react";

function Table(props) {
    return (

        <tbody>
            <tr>
                <td><img src={props.image} alt={props.first}></img></td>
                <td>{props.first}</td>
                <td>{props.last}</td>
                <td>{props.email}</td>
                <td>{props.age}</td>
                <td>{props.city}</td>
                <td>{props.state}</td>
            </tr>
        </tbody>

    )
}
export default Table;