import React, { useEffect, useState } from "react";
import { ResultOfCreatePresentation } from "./ResultOfCreatePresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";

export const ResultOfCreateContainer = (props) => {
  const [garment, setGarment] = useState({
    id: props.createResponse?.newGarment?.id,
    type: props.createResponse?.newGarment?.type,
    size: props.createResponse?.newGarment?.size,
    mainColor: props.createResponse?.newGarment?.mainColor,
    gender: props.createResponse?.newGarment?.gender,
    mainMaterial: props.createResponse?.newGarment?.mainMaterial,
    madeIn: props.createResponse?.newGarment?.madeIn,
    price: props.createResponse?.newGarment?.price,
    comment: props.createResponse?.newGarment?.comment,
    images: {},
  });
  const history = useHistory();

  const goToMenu = () => {
    history.push("/actions");
  };

  useEffect(() => {
    console.log(props.createResponse);
    props.setCreateRequest({ newGarment: {} });
    const garmentReq = JardinApiService().getGarmentById(
      props.createResponse?.newGarment?.id
    );
    garmentReq.then((res) => {
      console.log(res.data);
      if (res.status === 202) {
        const imagesReq = JardinApiService().getAllImagesLinks(res.data.id);
        imagesReq.then((res) => {
          console.log("IMAGESSSS :::::::::::::::::", res.data);
          if (res?.status === 200) {
            setGarment({
              id: props.createResponse?.newGarment?.id,
              type: props.createResponse?.newGarment?.type,
              size: props.createResponse?.newGarment?.size,
              mainColor: props.createResponse?.newGarment?.mainColor,
              gender: props.createResponse?.newGarment?.gender,
              mainMaterial: props.createResponse?.newGarment?.mainMaterial,
              madeIn: props.createResponse?.newGarment?.madeIn,
              price: props.createResponse?.newGarment?.price,
              comment: props.createResponse?.newGarment?.comment,
              images: res.data,
            });
          }
        });
      }
    });
  }, []);
  return (
    <ResultOfCreatePresentation
      createRsponse={props.createResponse}
      goToMenu={goToMenu}
      garment={garment}
    />
  );
};
