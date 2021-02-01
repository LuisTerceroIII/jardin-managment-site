import React from "react";

export const ResultOfCreatePresentation = (props) => {
  return (
    <React.Fragment>
      <p>
        Result of create was :{" "}
        {props.createRsponse.created ? "Success" : "Not create"}
      </p>

      <button className={"form-presentation-button"} onClick={props.goToMenu}>
        Volver
      </button>
    </React.Fragment>
  );
};
