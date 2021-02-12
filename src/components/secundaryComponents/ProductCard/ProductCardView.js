import React from "react";
import "./ProductCardView.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { utils } from "../../../utilFunctions/utils";

const ProductCardView = (props) => {
  const imageSlide = props.imagesLinks.map((image, key) => {
    return (
      <SplideSlide key={key + Math.random() * 50}>
        <img src={props.imagesLinks[key]} alt={` ${key + 1}`} />
      </SplideSlide>
    );
  });

  return (
    <div className={"product-card-main-container"}>
      <div className={"product-card-image-container"}>
        <Splide
          options={{
            rewind: true,
            gap: "0.1rem",
            type: "fade",
            arrows: false,
            autoplay: true,
            classes: {
              // Add classes for arrows.
              arrows: "splide__arrows",
              arrow: "splide__arrow",
              prev: "splide__arrow--prev",
              next: "splide__arrow--next",

              // Add classes for pagination.
              pagination: "splide__pagination", // container
              page: "splide__pagination__page", // each button
            },
          }}
          className={"splide"}
        >
          {imageSlide}
        </Splide>
      </div>

      <div className={"product-card-details"}>
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

export default ProductCardView;
