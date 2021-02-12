import React from "react";
import { DeleteProductContainer } from "../DeleteProductForm/DeleteProductContainer";
import DeleteProductCardContainer from "../../secundaryComponents/DeleteProductCard/DeleteProductCardContainer";
import "./ResultOfDeleteView.css";

export const ResultOfDeleteView = (props) => {
  const garmentToDelete = props.deleteResponse;

  return (
    <div className={"result-view-main-container"}>
      <h1 className={"result-delete-title"}>Producto eliminado </h1>
      <DeleteProductCardContainer garment={garmentToDelete} />
      <button
        className={"form-presentation-button result-delete-button"}
        onClick={props.goToMenu}
      >
        Volver
      </button>
    </div>
  );
};
