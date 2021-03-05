import React, { useContext, useState } from "react";

import "./UploadImageView.css";
import { UploadImageView } from "./UploadImageView";
import localStore from "store";
import { JardinApiService } from "../../../services/JardinApiService";
import LoggedUserContext from "../../../contexts/LoggedUserContext";

export const UploadImageContainer = (props) => {
  const userLogState = useContext(LoggedUserContext);
  /*
        uploading : muestra un spiner.
        uploaded : muestra icono de exito.
        error : muestra icono de error
     */
  const [upload, setUpload] = useState({
    uploading: false,
    uploaded: false,
    error: false,
  });
  const [disabled, setDisabled] = useState(false);
  //Esta variable sirve porque, cuando no es === "", se muestra la imagen que este en la url
  const [imageURL, setImageURL] = useState("");
  const garmentID = props.id;
  const imageNumber = props.imageNumber;

  const uploadImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setUpload({
      uploading: true,
      uploaded: false,
      error: false,
    });
    const uploadImageRequest = JardinApiService().postGarmentImage(
      garmentID,
      imageNumber,
      formData
    );
    uploadImageRequest
      .then((res) => {
        if (!res) {
          console.log(res);
          setUpload({
            uploading: false,
            uploaded: false,
            error: true,
          });
        }
        if (res?.status === 201) {
          setUpload({
            uploading: false,
            uploaded: true,
            error: false,
          });
          setDisabled(true);
          const getImageReq = JardinApiService().getGarmentImage(
            garmentID,
            imageNumber
          );
          getImageReq.then((res) => {
            if (res?.status === 200) {
              setImageURL(res.data);
            }
          });
        }

        if (res.status === 401) {
          userLogState.setCredentials({});
          localStore.remove("sessionToken");
          userLogState.setLogin(false);
        }

        if (res?.status === 400 || res?.status === 500) {
          setUpload({
            uploading: false,
            uploaded: false,
            error: true,
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStore.remove("sessionToken");
          userLogState.setCredentials({});
          userLogState.setLogin(false);
        }
        setImageURL("");
      });
  };

  const deleteImage = () => {
    setUpload({
      uploading: true,
      uploaded: false,
      error: false,
    });
    const deleteImageReq = JardinApiService().deleteGarmentImage(
      garmentID,
      imageNumber
    );

    deleteImageReq
      .then((res) => {
        if (res?.status === 200) {
          setUpload({
            uploading: false,
            uploaded: false,
            error: false,
          });
          setDisabled(false);
          setImageURL("");
        }

        if (res?.status === 401) {
          userLogState.setCredentials({});
          localStore.remove("sessionToken");
          userLogState.setLogin(false);
        }
      })
      .catch((err) => {
        setUpload({
          uploading: false,
          uploaded: false,
          error: true,
        });
      });
  };

  return (
    <UploadImageView
      uploadImage={uploadImage}
      upload={upload}
      disabled={disabled}
      imageURL={imageURL}
      deleteImage={deleteImage}
    />
  );
};
