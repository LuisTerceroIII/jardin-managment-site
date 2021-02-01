import React from "react";
import "./DeleteProductPresentation.css";
import { useForm } from "react-hook-form";

export const DeleteProductPresentation = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const garmentToDelete = props.garmentToDelete;

  const deleteGarment = () => {
    props.setDeleteGarment(true);
  };

  const processID_OnSubmit = (data) => {
    props.setGarmentToDeleteId(data.id);
    props.setSearchGarment(true);
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(processID_OnSubmit)}>
        <label> ID :</label>
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
        <button
          type={"submit"}
          className={"form-presentation-crate-button form-presentation-button"}
        >
          Buscar
        </button>
      </form>

      <h3>Producto a eliminar : </h3>
      <ul>
        <li>ID : {garmentToDelete.id}</li>
        <li>Tipo : {garmentToDelete.type}</li>
        <li>Talle : {garmentToDelete.mainColor}</li>
        <li>Genero : {garmentToDelete.gender}</li>
        <li>Material principal : {garmentToDelete.mainMaterial}</li>
        <li>Origen : {garmentToDelete.madeIn}</li>
        <li>Precio : {garmentToDelete.price}</li>
        <li>Comentario : {garmentToDelete.comment}</li>
      </ul>
      <button
        className={"form-presentation-crate-button form-presentation-button"}
        onClick={deleteGarment}
      >
        Eliminar
      </button>
    </React.Fragment>
  );
};
