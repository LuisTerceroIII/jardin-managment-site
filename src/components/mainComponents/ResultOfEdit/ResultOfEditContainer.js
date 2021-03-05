import React, { useContext, useEffect, useState } from "react";
import { ResultOfEditPresentation } from "./ResultOfEditPresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const ResultOfEditContainer = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const history = useHistory();

  const [garment, setGarment] = useState({
    id: JardinReqAndResStates.editResponse?.id,
    type: JardinReqAndResStates.editResponse?.type,
    size: JardinReqAndResStates.editResponse?.size,
    mainColor: JardinReqAndResStates.editResponse?.mainColor,
    gender: JardinReqAndResStates.editResponse?.gender,
    mainMaterial: JardinReqAndResStates.editResponse?.mainMaterial,
    madeIn: JardinReqAndResStates.editResponse?.madeIn,
    price: JardinReqAndResStates.editResponse?.price,
    comment: JardinReqAndResStates.editResponse?.comment,
    images: {},
  });

  useEffect(() => {
    const imagesReq = JardinApiService().getAllImagesLinks(
      JardinReqAndResStates.editResponse?.id
    );
    imagesReq.then((res) => {
      if (res?.status === 200) {
        setGarment({
          id: JardinReqAndResStates.editResponse?.id,
          type: JardinReqAndResStates.editResponse?.type,
          size: JardinReqAndResStates.editResponse?.size,
          mainColor: JardinReqAndResStates.editResponse?.mainColor,
          gender: JardinReqAndResStates.editResponse?.gender,
          mainMaterial: JardinReqAndResStates.editResponse?.mainMaterial,
          madeIn: JardinReqAndResStates.editResponse?.madeIn,
          price: JardinReqAndResStates.editResponse?.price,
          comment: JardinReqAndResStates.editResponse?.comment,
          images: res.data,
        });
      }
    });
  }, []);
  const goToMenu = () => {
    history.push("/actions");
  };
  return <ResultOfEditPresentation goToMenu={goToMenu} garment={garment} />;
};
