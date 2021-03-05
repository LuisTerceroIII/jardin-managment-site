import React from "react";
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
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={2}
          imageURL={imagesLinks.linkImage2 ?? ""}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={3}
          imageURL={imagesLinks.linkImage3 ?? ""}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={4}
          imageURL={imagesLinks.linkImage4 ?? ""}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={5}
          imageURL={imagesLinks.linkImage5 ?? ""}
          setRefresh={props.setRefresh}
        />
      </div>
      <div className={"mini-upload-image-group-mini-upload-component"}>
        <MiniUploadImageContainer
          id={props.id}
          imageNumber={6}
          imageURL={imagesLinks.linkImage6 ?? ""}
          setRefresh={props.setRefresh}
        />
      </div>
    </div>
  );
};

export default MiniUploadImageGroupView;
