import React,{useEffect,useState} from 'react'
import {ResultOfDeleteView} from "./ResultOfDeleteView";

export const ResultOfDeleteContainer = (props) => {

    return(
      <ResultOfDeleteView deleteResponse={props.deleteResponse}
      />
    )
}