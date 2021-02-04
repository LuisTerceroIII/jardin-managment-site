import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCheckCircle,
  faExclamationCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";

import "./UploadImageView.css";

export const UploadImageView = (props) => {
  useEffect(() => {
    console.log(props.imageURL);
  }, [props.imageURL]);
  const onDrop = useCallback((acceptedFiles) => {
    props.uploadImage(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: props.disabled,
  });
  return (
    <div className={"upload-image-main-container"}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={"drop-file-container"}>
          <div className={"drop-file-dotted-container"}>
            {props.imageURL !== "" ? (
              <div>
                <img
                  className={"uploaded-image"}
                  src={props.imageURL}
                  alt={"upload garment image"}
                />
              </div>
            ) : (
              <FontAwesomeIcon
                icon={faImage}
                className={"image-icon-upload-image"}
              />
            )}
          </div>

          {props.upload.uploading ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={40}
              width={40}
              radius={2}
            />
          ) : (
            <p> </p>
          )}

          {props.upload.uploaded ? (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={"success-icon-upload-image"}
            />
          ) : (
            <p> </p>
          )}

          {props.upload.error ? (
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={"error-icon-upload-image"}
            />
          ) : (
            <p> </p>
          )}
        </div>
      </div>
      {props.upload.uploaded ? (
        <button
          className={"button-delete-icon-upload-image"}
          onClick={props.deleteImage}
        >
          Borrar
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={"delete-icon-upload-image"}
          />
        </button>
      ) : (
        <p> </p>
      )}
    </div>
  );
};
