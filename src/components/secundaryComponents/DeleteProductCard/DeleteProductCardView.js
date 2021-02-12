import React from "react";
import { utils } from "../../../utilFunctions/utils";
import "./DeleteProductCardView.css";

const DeleteProductCardView = (props) => {
  return (
    <div className={"product-card-main-container"}>
      <div className={"product-card-details product-card-details-delete"}>
        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>ID </h3> :
          <h3>{props.garment.id}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Precio </h3> :
          <h3>{utils().formatter.format(props.garment.price)}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Tipo </h3> :
          <h3>{props.garment.type}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Talle </h3> :
          <h3>{props.garment.size}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Figura </h3> :
          <h3>{props.garment.gender}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Color</h3> :
          <h3>{props.garment.mainColor}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Material</h3> :
          <h3>{props.garment.mainMaterial}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}>Hecho en </h3> :
          <h3>{props.garment.madeIn}</h3>
        </span>
        <hr className={"product-card-divider-line"} />

        <span className={"product-card-detail"}>
          <h3 className={"product-card-detail-attribute-type"}> Comentario </h3>{" "}
          :<h3>{props.garment.comment}</h3>
        </span>
      </div>
    </div>
  );
};

export default DeleteProductCardView;
