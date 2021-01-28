import React from 'react'

export const ResultOfDeleteView = (props) => {
    const garmentToDelete = props.deleteResponse;

    return(
        <React.Fragment>
            <h3>Producto eliminado : </h3>
            <ul>
                <li>ID : {garmentToDelete.id}</li>
                <li>Tipo : {garmentToDelete.type}</li>
                <li>Talle : {garmentToDelete.mainColor}</li>
                <li>Genero : {garmentToDelete.gender}</li>
                <li>Material principal : {garmentToDelete.mainMaterial}</li>
                <li>Origen : {garmentToDelete.madeIn}</li>
                <li>Precio : {garmentToDelete.price}</li>
                <li>Comentario : {garmentToDelete.comment}</li>
            </ul>
            <button className={'form-presentation-crate-button form-presentation-button'} onClick={props.goToMenu} >
                Volver
            </button>
        </React.Fragment>

    )
}