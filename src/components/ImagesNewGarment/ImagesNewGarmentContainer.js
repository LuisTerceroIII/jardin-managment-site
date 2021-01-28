import React,{useEffect,useState} from 'react';
import {ImagesNewGarmentView} from "./ImagesNewGarmentView";
import {useHistory} from "react-router-dom";

export const ImagesNewGarmentContainer = (props) => {

    const history = useHistory();

    const finishUploadImages = () => {
        history.push("/create/result")
    }
    useEffect(() => {

    },[])

    return(
       <ImagesNewGarmentView finish={finishUploadImages} CreateResponse={props.createResponse}/>
    )
}