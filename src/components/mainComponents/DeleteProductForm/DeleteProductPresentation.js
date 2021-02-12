import React, { useEffect } from "react";
import "./DeleteProductPresentation.css";
import { useForm } from "react-hook-form";
import ProductCardContainer from "../../secundaryComponents/ProductCard/ProductCardContainer";
import { formData } from "../../../componentData/formsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import DeleteProductCardContainer from "../../secundaryComponents/DeleteProductCard/DeleteProductCardContainer";

export const DeleteProductPresentation = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const garmentToDelete = props.garmentToDelete;

  useEffect(() => {
    console.log("GARMENT TO DELETE::::::::::::::::", garmentToDelete);
  }, [garmentToDelete]);
  const deleteGarment = () => {
    props.setDeleteGarment(true);
  };

  const processID_OnSubmit = (data) => {
    props.setGarmentToDeleteId(data.id);
    props.setSearchGarment(true);
  };
  return (
    <div className={"delete-product-view-main-container"}>
      <h1 className={"delete-view-title title-main-actions"}>
        {formData.title.delete}
      </h1>
      <div
        className={"return-last-page-arrow-button"}
        onClick={() => props.goLastPage()}
      >
        <FontAwesomeIcon icon={faHandPointLeft} />
      </div>
      <form
        onSubmit={handleSubmit(processID_OnSubmit)}
        className={"delete-product-form"}
      >
        <label className={"delete-product-view-id-label"}> ID :</label>
        <input
          name={"id"}
          defaultValue={props.garmentToDeleteID}
          ref={register({
            required: true,
          })}
        />
        {errors.id && (
          <span>
            {" "}
            <br />
            ID requerido <br />
          </span>
        )}
        {props.idNotFound === true && (
          <span>
            {" "}
            <br />
            Id no existe
          </span>
        )}
        <br />
        <button type={"submit"} className={"form-presentation-button"}>
          Buscar
        </button>
      </form>
      <div className={"delete-product-view-product-card-container"}>
        <ProductCardContainer garment={garmentToDelete} />
      </div>

      <button
        className={"form-presentation-button delete-product-delete-button"}
        onClick={deleteGarment}
      >
        Eliminar
      </button>
    </div>
  );
};
