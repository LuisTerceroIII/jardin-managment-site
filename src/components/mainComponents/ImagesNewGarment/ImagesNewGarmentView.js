import React from "react";
import "./ImagesNewGarmentView.css";
import { UploadImageContainer } from "../../secundaryComponents/UploadImage/UploadImageContainer";
import { CreateProductFormPresentation } from "../CreateProductForm/CreateProductFormPresentation";

export const ImagesNewGarmentView = (props) => {
  const garment = props.CreateResponse?.newGarment;

  return (
    <div className="upload-image-group-main-container">
      <div className={"upload-image-group-container"}>
        <h1 className={"images-upload-group-title"}>Imágenes</h1>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-use-instruction"}>
            {props.instruction}
          </h6>
          <h6 className={"images-upload-group-image-number"}>1.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={1}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-image-number"}>2.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={2}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-image-number"}>3.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={3}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-image-number"}>4.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={4}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-image-number"}>5.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={5}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <div className={"upload-image-component-container"}>
          <h6 className={"images-upload-group-image-number"}>6.</h6>
          <UploadImageContainer
            id={garment.id}
            imageNumber={6}
            setCredentials={props.setCredentials}
            setLogin={props.setLogin}
          />
        </div>

        <input
          onClick={props.finish}
          value={"Finalizar"}
          className={"finish-upload-images-button form-presentation-button"}
        />
      </div>
    </div>
  );
};
