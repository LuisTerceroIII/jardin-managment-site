import React, { useEffect } from "react";
import { ResultOfCreatePresentation } from "./ResultOfCreatePresentation";
import { useHistory } from "react-router-dom";

export const ResultOfCreateContainer = (props) => {
  const history = useHistory();

  const goToMenu = () => {
    history.push("/actions");
  };
  useEffect(() => {
    props.setCreateRequest({ newGarment: {} });
  }, []);
  return (
    <ResultOfCreatePresentation
      createRsponse={props.createResponse}
      goToMenu={goToMenu}
    />
  );
};
