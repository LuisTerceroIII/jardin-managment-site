import React, { useEffect, useState } from "react";
import MiniUploadImageGroupView from "./MiniUploadImageGroupView";
import { JardinApiService } from "../../../services/JardinApiService";

/*
 * Componente que se coneccta con API, y pide los links de las images.
 * Este envia un link a cada "UploadImageComponent"
 *
 * */
const MiniUploadImageGroupContainer = (props) => {
  const garmentID = props.id;
  const [imagesLinks, setImagesLinks] = useState({});

  useEffect(() => {
    // Validar id para no pedir datos iniextistentes.
    if (props.idNotFound === false) {
      if (garmentID && props.refresh) {
        const imagesLinksReq = JardinApiService().getAllImagesLinks(garmentID);
        imagesLinksReq.then((res) => {
          if (res?.status === 200) {
            const images = res.data;
            setImagesLinks({
              linkImage1: images.linkImage1,
              linkImage2: images.linkImage2,
              linkImage3: images.linkImage3,
              linkImage4: images.linkImage4,
              linkImage5: images.linkImage5,
              linkImage6: images.linkImage6,
            });
          }
          props.setRefresh(false);
        });
      }
    }
  }, [garmentID, imagesLinks, props.refresh]);
  return (
    <MiniUploadImageGroupView
      id={garmentID}
      imagesLinks={imagesLinks}
      setRefresh={props.setRefresh}
    />
  );
};

export default MiniUploadImageGroupContainer;
