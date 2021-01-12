import React, { useEffect } from 'react'
import {ResultOfSearchPresentation} from "./ResultOfSearchPresentation";

export const ResultOfSearchContainer = (props) => {
    useEffect(() => {
        props.setQuery({query : {}})
    },[])
    return(
        <ResultOfSearchPresentation queryResponse={props.queryResponse}/>
    )
}