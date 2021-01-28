import React from 'react';

export const ImagesNewGarmentView = (props) => {
    const garment = props.CreateResponse?.newGarment
    return(
        <React.Fragment>
            Create : {props.CreateResponse?.created}
            <h4>
                Created Garment : {garment.id}
            </h4>
            <span>
                {`Id: ${garment.id}  Tipo: ${garment.type} Talle: ${garment.size} Color principal: ${garment.mainColor}
                 Genero: ${garment.gender} Material principal: ${garment.mainMaterial} Origen: ${garment.madeIn}
                  Precio: ${garment.price} Comentario: "${garment.comment}"`}
        </span>

            <button className={'form-presentation-crate-button form-presentation-button'} onClick={props.finish}>
                Finalizar
            </button>
        </React.Fragment>
    )
}