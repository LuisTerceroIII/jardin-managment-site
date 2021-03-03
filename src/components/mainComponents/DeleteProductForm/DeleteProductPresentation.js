import React, { useEffect } from "react";
import "./DeleteProductPresentation.css";
import { useForm } from "react-hook-form";
import ProductCardContainer from "../../secundaryComponents/ProductCard/ProductCardContainer";
import { formData } from "../../../componentData/formsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";

export const DeleteProductPresentation = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const garmentToDelete = props.garmentToDelete;

  useEffect(() => {}, [garmentToDelete]);
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
        {props.idSearchStatus.loading && (
          <Loader
            className={"spinner-result-of-search"}
            type="Oval"
            color="#00a6de"
            height={35}
            width={35}
            radius={0}
          />
        )}

        {props.idSearchStatus.error && (
          <span className={"delete-product-server-error-icon"}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        )}
        {props.idSearchStatus.error && (
          <span className={"delete-product-server-error-message"}>
            Error conectando con el servidor, intentalo mas tarde ...
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

      {props.deleteStatus.loading && (
        <Loader
          className={"spinner-delete-product"}
          type="Oval"
          color="#00a6de"
          height={35}
          width={35}
          radius={0}
        />
      )}

      {props.deleteStatus.error && (
        <span className={"delete-product-server-error-icon"}>
          {" "}
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </span>
      )}
      {props.deleteStatus.error && (
        <span className={"delete-product-server-error-message"}>
          Error conectando con el servidor, intentalo mas tarde ...
        </span>
      )}

      <button
        className={"form-presentation-button delete-product-delete-button"}
        onClick={deleteGarment}
      >
        Eliminar
      </button>
    </div>
  );
};
