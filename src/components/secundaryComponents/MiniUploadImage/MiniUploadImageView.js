import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  faImage,
  faCamera,
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MiniUploadImageView.css";
import Loader from "react-loader-spinner";

export const MiniUploadImageView = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    props.setAcceptedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: props.disabled,
  });
  const upload = props.upload;
  return (
    <div className={"mini-upload-image-main-container"}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={"mini-upload-image-inside-box"}>
          {upload.uploading === false &&
            upload.uploaded === false &&
            upload.error === false && (
              <div className={"camera-icon-mini-upload-image"}>
                <FontAwesomeIcon icon={faCamera} />
              </div>
            )}

          {upload.uploading === false &&
            upload.uploaded === true &&
            upload.error === false && (
              <img
                className={"image-mini-upload-image"}
                src={props.imageURL}
                alt={"upload garment"}
              />
            )}

          {upload.uploading === false &&
            upload.uploaded === false &&
            upload.error === true && (
              <div className={"error-icon-mini-upload-image"}>
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            )}

          {upload.uploading === true &&
            upload.uploaded === false &&
            upload.error === false && (
              <div className={"loader-mini-upload-image"}>
                <Loader
                  type="ThreeDots"
                  color="#000000"
                  height={40}
                  width={40}
                  radius={1}
                />
              </div>
            )}
        </div>
      </div>
      {props.upload.uploaded && (
        <button
          className={"button-delete-icon-mini-upload-image"}
          onClick={props.deleteImage}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  );
};
