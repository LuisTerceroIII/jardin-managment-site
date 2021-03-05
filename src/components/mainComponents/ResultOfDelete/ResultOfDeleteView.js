import React, { useContext } from "react";
import DeleteProductCardContainer from "../../secundaryComponents/DeleteProductCard/DeleteProductCardContainer";
import "./ResultOfDeleteView.css";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const ResultOfDeleteView = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const garmentToDelete = JardinReqAndResStates.deleteResponse;
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
