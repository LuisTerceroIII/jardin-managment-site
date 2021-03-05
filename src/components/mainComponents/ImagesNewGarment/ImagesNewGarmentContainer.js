import React, { useEffect } from "react";
import { ImagesNewGarmentView } from "./ImagesNewGarmentView";
import { useHistory } from "react-router-dom";

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
      instruction={instruction}
    />
  );
};
