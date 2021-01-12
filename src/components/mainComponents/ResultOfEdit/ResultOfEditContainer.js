import React from 'react'
import {ResultOfEditPresentation} from "./ResultOfEditPresentation";

export const  ResultOfEditContainer = (props) => {

    return (
        <ResultOfEditPresentation editResponse={props.editResponse} />
    )
}