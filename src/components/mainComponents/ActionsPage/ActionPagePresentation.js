import React from 'react'
import {Link} from "react-router-dom";

export const ActionPagePresentation = (props) => {


    const LinksCRUD = props.paths.map((path,index) => {
        return (
            <li key={index}>
                <Link to={path.path} >{path.name}</Link>
            </li>
        )
    })
    return (
            <ul>
                {LinksCRUD}
            </ul>
    )
}