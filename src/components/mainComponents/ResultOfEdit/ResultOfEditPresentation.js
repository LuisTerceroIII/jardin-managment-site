import React from "react";
import ProductCardContainer from "../../secundaryComponents/ProductCard/ProductCardContainer";
import "./ResultOfEditPresentation.css";

export const ResultOfEditPresentation = (props) => {
  return (
    <div className={"result-of-create-main-container"}>
      <h1 className={"result-create-title"}>Prenda actualizada</h1>

      <div className={"product-card-container"}>
        <ProductCardContainer garment={props.garment} />

        <button
          className={"form-presentation-button result-create-return-button"}
          onClick={props.goToMenu}
        >
          Volver
        </button>
      </div>
    </div>
  );
};
