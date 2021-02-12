import React, { useEffect, useState } from "react";
import { ResultOfEditPresentation } from "./ResultOfEditPresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";

export const ResultOfEditContainer = (props) => {
  const history = useHistory();

  const [garment, setGarment] = useState({
    id: props.editResponse?.id,
    type: props.editResponse?.type,
    size: props.editResponse?.size,
    mainColor: props.editResponse?.mainColor,
    gender: props.editResponse?.gender,
    mainMaterial: props.editResponse?.mainMaterial,
    madeIn: props.editResponse?.madeIn,
    price: props.editResponse?.price,
    comment: props.editResponse?.comment,
    images: {},
  });

  useEffect(() => {
    const imagesReq = JardinApiService().getAllImagesLinks(
      props.editResponse?.id
    );
    imagesReq.then((res) => {
      if (res?.status === 200) {
        setGarment({
          id: props.editResponse?.id,
          type: props.editResponse?.type,
          size: props.editResponse?.size,
          mainColor: props.editResponse?.mainColor,
          gender: props.editResponse?.gender,
          mainMaterial: props.editResponse?.mainMaterial,
          madeIn: props.editResponse?.madeIn,
          price: props.editResponse?.price,
          comment: props.editResponse?.comment,
          images: res.data,
        });
      }
    });
  }, []);
  const goToMenu = () => {
    history.push("/actions");
  };
  return (
    <ResultOfEditPresentation
      editResponse={props.editResponse}
      goToMenu={goToMenu}
      garment={garment}
    />
  );
};
