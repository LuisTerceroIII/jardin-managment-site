import React, { useEffect } from "react";
import ProductCardGroupView from "./ProductCardGroupView";

const ProductCardGroupContainer = (props) => {
  useEffect(() => {}, []);

  return <ProductCardGroupView garments={props.garments} />;
};

export default ProductCardGroupContainer;
