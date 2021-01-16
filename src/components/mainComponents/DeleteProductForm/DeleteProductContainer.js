import React, {useEffect, useState} from 'react';
import {DeleteProductPresentation} from "./DeleteProductPresentation";
import {JardinApiService} from "../../../services/JardinApiService";
import {useHistory} from "react-router-dom";

export const DeleteProductContainer = (props) => {

    const [garmentToDelete,setGarmentToDelete] = useState({
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
    const [garmentToDeleteID,setGarmentToDeleteId] = useState("")
    const [idNotFound,setIDNotFound] = useState(true)
    const [deleteGarment,setDeleteGarment] = useState(false)
    const [searchGarment,setSearchGarment] = useState(false)


    //history es una variable de React-router-dom
    //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
    //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
    // history.push("/rutaAIr")
    const history = useHistory()

    useEffect(() => {
        if(setSearchGarment && garmentToDeleteID !== "") {
            console.log("Se cmbio el valor del id !!!!! ")
            const response = JardinApiService().getGarmentById(garmentToDeleteID)
            response.then(res => {
                setGarmentToDelete(res.data)
                if(res.status === 404) {
                    console.log("Id no existe")
                    setIDNotFound(false)
                }
            })
            setSearchGarment(false)
        }

        if(deleteGarment && garmentToDelete.id !== "") {
            const responseOfDelete = JardinApiService().deleteGarmentById(garmentToDelete.id)
            responseOfDelete.then(res => {
                console.log(res);
                     if(res.status === 202) {
                          props.setDeleteResponse(res.data)
                          history.push('delete/result')
                      }
                      if(res.status === 404) {
                          props.setDeleteResponse({
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
                          history.push('delete/result')
                      }
            }).catch(err => {
                console.log("Dentro de deleteproducrt",err)
            })
            setDeleteGarment(false)
        }

    },[searchGarment,deleteGarment])

    return(
        <DeleteProductPresentation   garmentToDelete={garmentToDelete}
                                     setGarmentToDelete={setGarmentToDelete}
                                     garmentToDeleteID={garmentToDeleteID}
                                     setGarmentToDeleteId={setGarmentToDeleteId}
                                     idNotFound={idNotFound}
                                     deleteGarment={deleteGarment}
                                     setDeleteGarment={setDeleteGarment}
                                     setSearchGarment={setSearchGarment}
        />
    )
}