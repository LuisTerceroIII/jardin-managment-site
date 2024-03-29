import React, { useContext } from "react";
import "./CreateProductFormPresentation.css";

import { useForm } from "react-hook-form";
import { formData } from "../../../componentData/formsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const CreateProductFormPresentation = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const garment = {
      comment: data.comment,
      gender: data.gender,
      madeIn: data.madeIn,
      mainMaterial: data.mainMaterial,
      mainColor: "",
      price: data.price,
      size: data.size,
      type: data.type,
    };

    JardinReqAndResStates.setCreateRequest({
      newGarment: garment,
    });
  };
  const genders = formData.genders.map((gender, index) => {
    return <option key={index}>{gender}</option>;
  });
  const materials = formData.materials.map((material, index) => {
    return <option key={index}>{material}</option>;
  });
  const madeIn = formData.madeIn.map((country, index) => {
    return <option key={index}>{country}</option>;
  });

  return (
    <div className={"form-presentation-main-container"}>
      <h1 className={"title-main-actions"}>{formData.title.create}</h1>
      <div
        className={"return-last-page-arrow-button"}
        onClick={() => props.goLastPage()}
      >
        <FontAwesomeIcon icon={faHandPointLeft} />
      </div>
      <form
        className={"form-presentation-form-container"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={"form-presentation-label"}>Tipo de prenda</label>
        <input
          name="type"
          className={"form-presentation-input"}
          ref={register({
            required: true,
          })}
        />
        {errors.type && <span>Tipo requerido</span>}

        <label className={"form-presentation-label"}>Talle</label>
        <input
          className={"form-presentation-input"}
          name={"size"}
          ref={register({
            required: true,
          })}
        />
        <label className={"form-presentation-label"}>Figura</label>
        <select
          className={"form-presentation-input"}
          name={"gender"}
          ref={register({
            required: true,
          })}
        >
          {genders}
        </select>

        <label className={"form-presentation-label"}>Material principal</label>
        <select
          className={"form-presentation-input"}
          name="mainMaterial"
          ref={register({
            required: true,
          })}
        >
          {materials}
        </select>

        <label className={"form-presentation-label"}>Origen</label>
        <select
          className={"form-presentation-input"}
          name={"madeIn"}
          ref={register({
            required: true,
          })}
        >
          {madeIn}
        </select>

        <label className={"form-presentation-label"}>Precio</label>
        <input
          type={"number"}
          className={"form-presentation-input"}
          name={"price"}
          ref={register({
            required: true,
          })}
        />

        <label className={"form-presentation-label"}>Comentario</label>
        <textarea
          className={"form-presentation-textarea"}
          name={"comment"}
          ref={register({
            required: true,
          })}
          rows={2}
        />
        {props.loading && (
          <Loader
            className={"spinner-result-of-search"}
            type="Oval"
            color="#00a6de"
            height={35}
            width={35}
            radius={0}
          />
        )}

        {props.error && (
          <span className={"get-garment-by-server-error-icon"}>
            {" "}
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        )}
        {props.error && (
          <span className={"get-garment-by-server-error-message"}>
            Error conectando con el servidor, intentalo mas tarde ...
          </span>
        )}

        <input
          type={"submit"}
          value={"Crear"}
          className={"form-presentation-crate-button form-presentation-button"}
        />
      </form>
    </div>
  );
};
