import React from "react";

export const ResultOfSearchPresentation = (props) => {
  const results = props.queryResponse.map((garment, key) => {
    return (
      <li key={key}>
        {`Id: ${garment.id}  Tipo: ${garment.type} Talle: ${garment.size} Color principal: ${garment.mainColor}
                 Genero: ${garment.gender} Material principal: ${garment.mainMaterial} Origen: ${garment.madeIn}
                  Precio: ${garment.price} Comentario: "${garment.comment}"`}
      </li>
    );
  });
  return (
    <React.Fragment>
      <ul>
        <p>Resultados:</p>
        {results}
      </ul>
      <button
        className={"form-presentation-crate-button form-presentation-button"}
        onClick={props.goToMenu}
      >
        Volver
      </button>
    </React.Fragment>
  );
};
