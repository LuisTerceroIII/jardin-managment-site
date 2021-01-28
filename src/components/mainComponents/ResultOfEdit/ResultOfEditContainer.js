import React from 'react'
import {ResultOfEditPresentation} from "./ResultOfEditPresentation";
import {useHistory} from "react-router-dom";

export const  ResultOfEditContainer = (props) => {
    const history = useHistory()

    const goToMenu = () => {
        history.push("/actions")
    }
    return (
        <ResultOfEditPresentation editResponse={props.editResponse} goToMenu={goToMenu}/>
    )
}