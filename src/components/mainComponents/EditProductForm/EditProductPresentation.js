import React, { useState, useEffect, useContext } from "react";
import "./EditProductPresentation.css";
import { useForm } from "react-hook-form";
import { formData } from "../../../componentData/formsData";
import MiniUploadImageGroupContainer from "../../secundaryComponents/MiniUploadImageGroup/MiniUploadImageGroupContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointLeft,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import LoggedUserContext from "../../../contexts/LoggedUserContext";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const EditProductPresentation = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const [submitButton, setSubmitButton] = useState("id");
  const { register, handleSubmit } = useForm();

  useEffect(() => {}, [props.garmentToUpdate, props.idNotFound]);

  const onSubmit = (data) => {
    if (submitButton === "sendPatchGarment") {
      props.setPatchGarment(true);
      JardinReqAndResStates.setEditRequest(data);
    } else {
      props.setGarmentToUpdateId(data.id);
      props.setSearchGarment(true);
    }
  };

  const genders = formData.genders.map((gender, index) => {
    return props.garmentToUpdate.gender === gender ? (
      <option selected={true} key={index}>
        {gender}
      </option>
    ) : (
      <option key={index}>{gender}</option>
    );
  });
  const materials = formData.materials.map((material, index) => {
    return props.garmentToUpdate.mainMaterial === material ? (
      <option selected={true} key={index}>
        {material}
      </option>
    ) : (
      <option key={index}>{material}</option>
    );
  });
  const madeIn = formData.madeIn.map((country, index) => {
    return props.garmentToUpdate.madeIn === country ? (
      <option selected={true} key={index}>
        {country}
      </option>
    ) : (
      <option key={index}>{country}</option>
    );
  });

  return (
    <div className={"form-presentation-main-container"}>
      <h1 className={"title-main-actions"}>{formData.title.edit}</h1>
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
        <label className={"form-presentation-label"}> Id </label>
        <input
          name="id"
          className={"form-presentation-input"}
          defaultValue={props.garmentToUpdateId}
          ref={register({
            required: true,
          })}
        />
        {props.idNotFound === true && (
          <span className={"edit-product-view-id-not-found"}>Id no existe</span>
        )}
        {props.loadingID && (
          <Loader
            className={"spinner-get-garment-by-id"}
            type="Oval"
            color="#00a6de"
            height={35}
            width={35}
            radius={0}
          />
        )}
        {props.errorID && (
          <span className={"get-garment-by-server-error-icon"}>
            {" "}
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        )}
        {props.errorID && (
          <span className={"get-garment-by-server-error-message"}>
            Error conectando con el servidor, intentalo mas tarde ...
          </span>
        )}
        <button
          type={"submit"}
          onClick={() => setSubmitButton("id")}
          className={"form-edit-button"}
        >
          Buscar
        </button>

        <label className={"form-presentation-label"}>Tipo de prenda</label>
        <input
          name="type"
          className={"form-presentation-input"}
          defaultValue={props.garmentToUpdate.type}
          ref={register({
            required: false,
          })}
        />

        <label className={"form-presentation-label"}>Talle</label>
        <input
          className={"form-presentation-input"}
          defaultValue={props.garmentToUpdate.size}
          onChange={() => null}
          name={"size"}
          ref={register({
            required: false,
          })}
        />
        <label className={"form-presentation-label"}>Figura</label>
        <select
          className={"form-presentation-input"}
          name={"gender"}
          ref={register({
            required: false,
          })}
        >
          {genders}
        </select>

        <label className={"form-presentation-label"}>Material principal</label>
        <select
          className={"form-presentation-input"}
          name="mainMaterial"
          ref={register({
            required: false,
          })}
        >
          {materials}
        </select>

        <label className={"form-presentation-label"}>Origen</label>
        <select
          className={"form-presentation-input"}
          name={"madeIn"}
          ref={register({
            required: false,
          })}
        >
          {madeIn}
        </select>

        <label className={"form-presentation-label"}>Precio</label>
        <input
          type={"number"}
          defaultValue={props.garmentToUpdate.price}
          onChange={() => null}
          className={"form-presentation-input"}
          name={"price"}
          ref={register({
            required: false,
          })}
        />
        <label className={"form-presentation-label"}>Imagenes</label>
        <MiniUploadImageGroupContainer
          idNotFound={props.idNotFound}
          id={props.garmentToUpdateId}
          setRefresh={props.setRefresh}
          refresh={props.refresh}
        />
        <label className={"form-presentation-label"}>Comentario</label>
        <textarea
          className={"form-presentation-textarea"}
          defaultValue={props.garmentToUpdate.comment}
          onChange={() => null}
          name={"comment"}
          ref={register({
            required: false,
          })}
          rows={2}
        />
        {props.loadingEdit && (
          <Loader
            className={"spinner-result-of-search"}
            type="Oval"
            color="#00a6de"
            height={35}
            width={35}
            radius={0}
          />
        )}

        {props.errorEdit && (
          <span className={"get-garment-by-server-error-icon"}>
            {" "}
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        )}
        {props.errorEdit && (
          <span className={"get-garment-by-server-error-message"}>
            Error conectando con el servidor, intentalo mas tarde ...
          </span>
        )}

        {props.idRequiredMessage && (
          <span className={"id-required-message"}>
            Primero selecciona una prenda por su id
          </span>
        )}

        <input
          type={"submit"}
          value={"Editar"}
          className={"form-presentation-crate-button form-presentation-button"}
          onClick={() => {
            if (!props.idNotFound && !props.errorID) {
              return setSubmitButton("sendPatchGarment");
            }
          }}
        />
      </form>
    </div>
  );
};
