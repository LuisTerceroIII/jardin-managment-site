import React,{useEffect} from 'react';
import {CreateProductFormPresentation} from "./CreateProductFormPresentation.js";
import {useHistory} from "react-router-dom";
import {utils} from "../../../utilFunctions/utils";
import {JardinApiService} from "../../../services/JardinApiService";


export const CreateProductFormContainer = (props) => {


    //history es una variable de React-router-dom
    //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
    //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
    // history.push("/rutaAIr")
    const history = useHistory()

    /*
        Si createRequest.newGarment se actualiza se ejecuta useEffect:

            Si hay  respuesta ejecutar:
                Se setea la respuesta setCreateResponse(respuesta.data).

                Si createRequest.newGarment no esta vacio y respuesta.data == true:
                     redirect to = /create/result
                     Muestra "Creacion exitosa"

                Si createRequest.newGarment no esta vacio y respuesta.data == false:
                     redirect to = /create/result
                     Muestra "Creacion no exitosa"

                Estos dos parecen redundantes, pero nos
     */
    useEffect(() => {
        const saveWithoutPictures = JardinApiService().saveWithoutPictures(props.createRequest.newGarment)

        saveWithoutPictures.then(res => {

            if(res) {
                let response = res.data
                props.setCreateResponse(response)
                console.log(res.status)
                if(!utils().isEmpty(props.createRequest.newGarment) && res.data) {
                    history.push("/create/result")
                }

                if(!utils().isEmpty(props.createRequest.newGarment) && res.data === false) {
                    history.push("/create/result")
                }
            }
        })

    },[props.createRequest.newGarment])

    return (
        <CreateProductFormPresentation setCreateRequest={props.setCreateRequest}

        />
    )
}
