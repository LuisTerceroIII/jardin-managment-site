import React ,{useEffect} from 'react'
import {ResultOfCreatePresentation} from "./ResultOfCreatePresentation";

export const ResultOfCreateContainer = (props) => {

    useEffect(() => {
            props.setCreateRequest({newGarment : {}})
    },[])
    return (
        <ResultOfCreatePresentation  createRsponse={props.createResponse}/>
    )
}