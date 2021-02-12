import React, { useState, useEffect } from "react";
import { MiniUploadImageView } from "./MiniUploadImageView";
import { JardinApiService } from "../../../services/JardinApiService";
import localStore from "store";
/*
 * Componente con 4 estados :
 * 1) Uploading -> Muestra un spiner de carga
 * 2) Uploaded -> Muestra imagen subida
 * 3) Error -> Muestra icono de error
 * 4) Ninguno de los anteriores, vendria a ser el Default. Muestra icono de camara.
 *
 * Recibe una imagen, la envia al servidor, luego la muestra.
 * Hace dos llamados al momento de "uploadImage"
 * 1) Envia imagen POST.
 * 2) Pide imagen enviada GET.
 *
 * */
export const MiniUploadImageContainer = (props) => {
  const [disabled, setDisabled] = useState(false);
  let imageURL = props.imageURL;
  const garmentID = props.id;
  const imageNumber = props.imageNumber;
  const [upload, setUpload] = useState({
    uploading: false,
    uploaded: false,
    error: false,
  });

  const [acceptedFiles, setAcceptedFiles] = useState("");

  useEffect(() => {
    console.log(imageURL);
    if (imageURL !== "") {
      setUpload({
        uploading: false,
        uploaded: true,
        error: false,
      });
    }
    if (acceptedFiles !== "") {
      setUpload({
        uploading: true,
        uploaded: false,
        error: false,
      });
      uploadImage(acceptedFiles);
      setAcceptedFiles("");
    }
  }, [imageURL, acceptedFiles]);

  const uploadImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    const uploadImageReq = JardinApiService().postGarmentImage(
      garmentID,
      imageNumber,
      formData
    );
    uploadImageReq
      .then((res) => {
        console.log(res);
        if (res === undefined) {
          console.log("Undefined");
          setUpload({
            uploading: false,
            uploaded: false,
            error: true,
          });
          props.setRefresh(true);
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
          getImageReq
            .then((res) => {
              if (res?.status === 200) {
                imageURL = res.data;
                props.setRefresh(true);
              } else if (res?.status === 400 || res?.status === 404) {
                setUpload({
                  uploading: false,
                  uploaded: false,
                  error: true,
                });
                props.setRefresh(true);
              }
            })
            .catch((err) => {
              console.log("GET ::::: " + err);
              setUpload({
                uploading: false,
                uploaded: false,
                error: true,
              });
              props.setRefresh(true);
            });
        }
        if (res?.status === 401) {
          localStore.remove("sessionToken");
          props.setCredentials({});
          props.setLogin(false);
        }
        if (res?.status === 400 || res?.status === 500) {
          setUpload({
            uploading: false,
            uploaded: false,
            error: true,
          });
          props.setRefresh(true);
        }
      })
      .catch((err) => {
        console.log("POST ::::: " + err);
        setUpload({
          uploading: false,
          uploaded: false,
          error: true,
        });
        props.setRefresh(true);
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
          props.setRefresh(true);
          imageURL = "";
        }
      })
      .catch((err) => {
        console.log(err);
        setUpload({
          uploading: false,
          uploaded: false,
          error: true,
        });
      });
  };
  return (
    <MiniUploadImageView
      disabled={disabled}
      imageURL={imageURL}
      upload={upload}
      uploadImage={uploadImage}
      deleteImage={deleteImage}
      id={garmentID}
      setAcceptedFiles={setAcceptedFiles}
    />
  );
};
