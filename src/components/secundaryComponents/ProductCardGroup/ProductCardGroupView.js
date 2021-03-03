import React, { useEffect } from "react";
import ProductCardContainer from "../ProductCard/ProductCardContainer";
import "./ProductCardGroupView.css";

const ProductCardGroupView = (props) => {
  useEffect(() => {}, []);
  const productsCards = props.garments.map((garment, key) => {
    return (
      <div
        className={"search-result-product-card-container"}
        key={garment?.id * key}
      >
        <ProductCardContainer garment={garment} />
      </div>
    );
  });
  return (
    <div className={"search-result-product-card-main-container"}>
      {productsCards}
    </div>
  );
};

export default ProductCardGroupView;
