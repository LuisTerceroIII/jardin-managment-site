import React, { useState, useEffect } from "react";
import ProductCardView from "./ProductCardView";

const ProductCardContainer = (props) => {
  const arrayImages = Object.values(props.garment?.images);
  const imagesLinks = arrayImages.splice(1, arrayImages.length);
  const availableImages = imagesLinks.filter((link) => link !== null);
  const [imageURL, setImageURL] = useState(
    imagesLinks[0] ||
      imagesLinks[1] ||
      imagesLinks[2] ||
      imagesLinks[3] ||
      imagesLinks[4] ||
      imagesLinks[5]
  );
  useEffect(() => {}, [imageURL]);
  return (
    <ProductCardView
      garment={props.garment}
      imageURL={imageURL}
      setImageURL={setImageURL}
      imagesLinks={availableImages}
    />
  );
};

export default ProductCardContainer;
