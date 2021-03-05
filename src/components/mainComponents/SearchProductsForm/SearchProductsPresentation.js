import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { formData } from "../../../componentData/formsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const SearchProductsPresentation = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  // Start forms variables ------------------------------------------
  const types = formData.types.map((type, index) => {
    return <option key={index}>{type}</option>;
  });
  const sizes = formData.sizes.map((size, index) => {
    return <option key={index}>{size}</option>;
  });
  const genders = formData.genders.map((gender, index) => {
    return <option key={index}>{gender}</option>;
  });
  const materials = formData.materials.map((material, index) => {
    return <option key={index}>{material}</option>;
  });
  const madeIn = formData.madeIn.map((country, index) => {
    return <option key={index}>{country}</option>;
  });

  const { register, handleSubmit } = useForm();
  // End form variables ---------------------------------------
  // Funcion que captura los datos del formulario.
  const onSubmit = (data) => {
    const garment = {
      // TODO: Evaluar si incluir "comment" como parametro de busqueda.
      comment: data.comment,
      gender: data.gender,
      madeIn: data.madeIn,
      mainMaterial: data.mainMaterial,
      // TODO: Resolver formato de color.
      mainColor: "",
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
      size: data.size,
      type: data.type,
    };
    let query = {
      query: garment,
    };
    JardinReqAndResStates.setSearchRequest(query);
  };

  return (
    <div className={"form-presentation-main-container"}>
      <h1 className={"title-main-actions"}>{formData.title.search}</h1>
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
        <select
          name="type"
          className={"form-presentation-input"}
          ref={register({
            required: false,
          })}
        >
          {types}
        </select>

        <label className={"form-presentation-label"}>Talle</label>
        <select
          className={"form-presentation-input"}
          name={"size"}
          ref={register({
            required: false,
          })}
        >
          {sizes}
        </select>

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
        <label className={"form-presentation-label"}>Desde</label>
        <input
          type={"number"}
          className={"form-presentation-input"}
          name={"priceFrom"}
          ref={register({
            required: false,
          })}
        />

        <label className={"form-presentation-label"}>Hasta</label>
        <input
          type={"number"}
          className={"form-presentation-input"}
          name={"priceTo"}
          ref={register({
            required: false,
          })}
        />
        <input
          type={"submit"}
          value={"Buscar"}
          className={"form-presentation-crate-button form-presentation-button"}
        />
      </form>
    </div>
  );
};
