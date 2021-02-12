import React, { useEffect } from "react";
import DeleteProductCardView from "./DeleteProductCardView";

const DeleteProductCardContainer = (props) => {
  useEffect(() => {
    console.log(props.garment);
  });
  return <DeleteProductCardView garment={props.garment} />;
};
export default DeleteProductCardContainer;
