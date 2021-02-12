import React, { useEffect, useState } from "react";
import { ImagesNewGarmentView } from "./ImagesNewGarmentView";
import { useHistory } from "react-router-dom";
import { CreateProductFormPresentation } from "../CreateProductForm/CreateProductFormPresentation";

export const ImagesNewGarmentContainer = (props) => {
  const history = useHistory();
  const instruction =
    "Clickea en el icono de imagen, o arrastra una para subirla.";

  const finishUploadImages = () => {
    history.push("/create/result");
  };
  useEffect(() => {}, []);

  return (
    <ImagesNewGarmentView
      finish={finishUploadImages}
      CreateResponse={props.createResponse}
      instruction={instruction}
      setCredentials={props.setCredentials}
      setLogin={props.setLogin}
    />
  );
};
