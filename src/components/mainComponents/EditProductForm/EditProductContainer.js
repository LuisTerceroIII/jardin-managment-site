import React,{useState, useEffect} from 'react';
import {EditProductPresentation} from "./EditProductPresentation";
import {useHistory} from "react-router-dom";
import {JardinApiService} from "../../../services/JardinApiService";

export const EditProductContainer = (props) => {

    //history es una variable de React-router-dom
    //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
    //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
    // history.push("/rutaAIr")
    const history = useHistory()

    const [garmentToUpdate,setGarmentToUpdate] = useState({
        id : "",
        type : "",
        size : "",
        mainColor : "",
        gender: "",
        mainMaterial : "",
        madeIn : "",
        price : "",
        comment : ""
    })

    const [garmentToUpdateId,setGarmentToUpdateId] = useState("")

    const [searchGarment,setSearchGarment] = useState(false)
    const [patchGarment,setPatchGarment] = useState(false)

    const [idNotFound,setIDNotFound] = useState(true)


    useEffect(() => {

        if(searchGarment === true) {
            const response = JardinApiService().getGarmentById(garmentToUpdateId)
            response.then(garment => {
                if(garment.status === 404) {
                    setIDNotFound(false)
                    setGarmentToUpdate({id : "",type : "",size : "",mainColor : "",gender: "",mainMaterial : "",madeIn : "",price : "",comment : ""})
                }
                if(garment.status === 500) {
                    console.log("Error interno del servidor")
                    setIDNotFound(false)
                    setGarmentToUpdate({id : "",type : "",size : "",mainColor : "",gender: "",mainMaterial : "",madeIn : "",price : "",comment : ""})
                }
                if(garment.status === 202) {
                    setIDNotFound(true)
                    setGarmentToUpdate(garment.data)
                }
            })
            setSearchGarment(false)
        }
        if(patchGarment === true) {
            setPatchGarment(false)
            const response = JardinApiService().patchGarmentById(props.editRequest)
            response.then(res => {
                props.setEditResponse(res.data)
                history.push("/edit/result")
            })
        }
    },[props.editRequest,searchGarment])

    return(
        <EditProductPresentation garmentToUpdate={garmentToUpdate}
                                 setGarmentToUpdate={setGarmentToUpdate}
                                 setGarmentToUpdateId={setGarmentToUpdateId}
                                 garmentToUpdateId={garmentToUpdateId}
                                 setSearchGarment={setSearchGarment}
                                 setPatchGarment={setPatchGarment}
                                 setEditRequest={props.setEditRequest}
                                 idNotFound={idNotFound}
        />
    )
}