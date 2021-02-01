import React from "react";

export const ResultOfEditPresentation = (props) => {
  const garment = props.editResponse;
  return (
    <div>
      <h4>Updated Garment :</h4>
      <span>
        {`Id: ${garment.id}  Tipo: ${garment.type} Talle: ${garment.size} Color principal: ${garment.mainColor}
                 Genero: ${garment.gender} Material principal: ${garment.mainMaterial} Origen: ${garment.madeIn}
                  Precio: ${garment.price} Comentario: "${garment.comment}"`}
      </span>
      <button
        className={"form-presentation-crate-button form-presentation-button"}
        onClick={props.goToMenu}
      >
        Volver
      </button>
    </div>
  );
};
