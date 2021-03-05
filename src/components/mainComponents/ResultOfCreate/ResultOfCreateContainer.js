import React, { useContext, useEffect, useState } from "react";
import { ResultOfCreatePresentation } from "./ResultOfCreatePresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const ResultOfCreateContainer = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const [garment, setGarment] = useState({
    id: JardinReqAndResStates.createResponse?.newGarment?.id,
    type: JardinReqAndResStates.createResponse?.newGarment?.type,
    size: JardinReqAndResStates.createResponse?.newGarment?.size,
    mainColor: JardinReqAndResStates.createResponse?.newGarment?.mainColor,
    gender: JardinReqAndResStates.createResponse?.newGarment?.gender,
    mainMaterial:
      JardinReqAndResStates.createResponse?.newGarment?.mainMaterial,
    madeIn: JardinReqAndResStates.createResponse?.newGarment?.madeIn,
    price: JardinReqAndResStates.createResponse?.newGarment?.price,
    comment: JardinReqAndResStates.createResponse?.newGarment?.comment,
    images: {},
  });
  const history = useHistory();

  const goToMenu = () => {
    history.push("/actions");
  };

  useEffect(() => {
    JardinReqAndResStates.setCreateRequest({ newGarment: {} });
    const garmentReq = JardinApiService().getGarmentById(
      JardinReqAndResStates.createResponse?.newGarment?.id
    );
    garmentReq.then((res) => {
      if (res?.status === 202) {
        const imagesReq = JardinApiService().getAllImagesLinks(res.data.id);
        imagesReq.then((res) => {
          if (res?.status === 200) {
            setGarment({
              id: JardinReqAndResStates.createResponse?.newGarment?.id,
              type: JardinReqAndResStates.createResponse?.newGarment?.type,
              size: JardinReqAndResStates.createResponse?.newGarment?.size,
              mainColor:
                JardinReqAndResStates.createResponse?.newGarment?.mainColor,
              gender: JardinReqAndResStates.createResponse?.newGarment?.gender,
              mainMaterial:
                JardinReqAndResStates.createResponse?.newGarment?.mainMaterial,
              madeIn: JardinReqAndResStates.createResponse?.newGarment?.madeIn,
              price: JardinReqAndResStates.createResponse?.newGarment?.price,
              comment:
                JardinReqAndResStates.createResponse?.newGarment?.comment,
              images: res.data,
            });
          }
        });
      }
    });
  }, []);
  return <ResultOfCreatePresentation goToMenu={goToMenu} garment={garment} />;
};
