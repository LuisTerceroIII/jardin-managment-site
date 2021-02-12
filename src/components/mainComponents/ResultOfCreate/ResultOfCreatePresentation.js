import React, { useEffect } from "react";
import ProductCardContainer from "../../secundaryComponents/ProductCard/ProductCardContainer";
import "./ResultOfCreatePresentation.css";

export const ResultOfCreatePresentation = (props) => {
  useEffect(() => {});
  return (
    <div className={"result-of-create-main-container"}>
      <h1 className={"result-create-title"}>Producto creado </h1>
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
