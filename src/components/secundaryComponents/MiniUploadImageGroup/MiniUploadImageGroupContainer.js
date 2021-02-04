import React, { useEffect, useState } from "react";
import MiniUploadImageGroupView from "./MiniUploadImageGroupView";
import localStore from "store";
import { JardinApiService } from "../../../services/JardinApiService";
import { EditProductPresentation } from "../../mainComponents/EditProductForm/EditProductPresentation";

const MiniUploadImageGroupContainer = (props) => {
  const garmentID = props.id;
  const [imagesLinks, setImagesLinks] = useState({});

  //  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    console.log("Mini GROUP ::::  " + garmentID);
    if (props.idNotFound === false) {
      // Validar id para no pedir datos iniextistentes.
      const sessionToken = localStore.get("sessionToken") || null;
      if (garmentID && sessionToken && props.refresh) {
        const imagesLinksReq = JardinApiService().getAllImagesLinks(
          garmentID,
          sessionToken
        );
        imagesLinksReq
          .then((res) => {
            if (res?.status === 200) {
              const images = res.data;
              console.log(images);
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
          })
          .catch((err) => {});
      }
    }
  }, [garmentID, imagesLinks, props.refresh]);
  return (
    <MiniUploadImageGroupView
      id={garmentID}
      imagesLinks={imagesLinks}
      setCredentials={props.setCredentials}
      setLogin={props.setLogin}
      setRefresh={props.setRefresh}
    />
  );
};

export default MiniUploadImageGroupContainer;
