import React, { useEffect } from "react";
import DeleteProductCardView from "./DeleteProductCardView";

const DeleteProductCardContainer = (props) => {
  useEffect(() => {});
  return <DeleteProductCardView garment={props.garment} />;
};
export default DeleteProductCardContainer;
