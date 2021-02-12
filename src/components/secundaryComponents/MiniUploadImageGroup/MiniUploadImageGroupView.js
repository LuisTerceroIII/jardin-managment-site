import React, { useState, useEffect } from "react";
import { MiniUploadImageContainer } from "../MiniUploadImage/MiniUploadImageContainer";
import "./MiniUploadImageGroupView.css";

/*
 * Se muestran 6 Componentes que permiten modificar las images asociadas a un producto.
 * */
const MiniUploadImageGroupView = (props) => {
  const imagesLinks = props.imagesLinks;
  return (
    <div className={"mini-upload-image-group-main-container"}>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={1}
          imageURL={imagesLinks.linkImage1 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={2}
          imageURL={imagesLinks.linkImage2 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={3}
          imageURL={imagesLinks.linkImage3 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={4}
          imageURL={imagesLinks.linkImage4 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={5}
          imageURL={imagesLinks.linkImage5 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={6}
          imageURL={imagesLinks.linkImage6 ?? ""}
          setCredentials={props.setCredentials}
          setLogin={props.setLogin}
          setRefresh={props.setRefresh}
        />
      </div>
    </div>
  );
};

export default MiniUploadImageGroupView;
