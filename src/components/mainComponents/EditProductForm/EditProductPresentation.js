import React, { useState, useEffect } from "react";
import "./EditProductPresentation.css";
import { useForm } from "react-hook-form";
import InputColor from "react-input-color";
import { formData } from "../../../componentData/formsData";

export const EditProductPresentation = (props) => {
  const [color, setColor] = React.useState({});
  const [submitButton, setSubmitButton] = useState("id");
  const { register, handleSubmit } = useForm();

  useEffect(() => {}, [props.garmentToUpdate, props.idNotFound]);

  const onSubmit = (data) => {
    if (submitButton === "sendPatchGarment") {
      props.setPatchGarment(true);
      props.setEditRequest(data);
    } else {
      props.setGarmentToUpdateId(data.id);
      props.setSearchGarment(true);
    }
  };

  const onChangeColor = (e) => {
    setColor(e);
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
      <h1 className={"form-presentation-title"}>{formData.title}</h1>

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
            required: false,
          })}
        />
        {props.idNotFound === false && <span>Id no existe</span>}
        <button
          type={"submit"}
          onClick={() => setSubmitButton("id")}
          className={"form-presentation-crate-button form-presentation-button"}
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
        <label className={"form-presentation-label"}>Genero</label>
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

        <label className={"form-presentation-label"}>Color Principal</label>
        <InputColor
          className={"form-presentation-input"}
          initialValue="#cbdb37"
          onChange={(e) => onChangeColor(e)}
          placement="right"
        />
        <label className={"form-presentation-label"}>Imagenes</label>

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

        <input
          type={"submit"}
          value={"Editar"}
          className={"form-presentation-crate-button form-presentation-button"}
          onClick={() => setSubmitButton("sendPatchGarment")}
        />
      </form>
    </div>
  );
};
