import React, { useEffect } from "react";
import { ResultOfSearchPresentation } from "./ResultOfSearchPresentation";
import { useHistory } from "react-router-dom";

export const ResultOfSearchContainer = (props) => {
  const history = useHistory();

  const goToMenu = () => {
    history.push("/actions");
  };

  useEffect(() => {
    props.setQuery({ query: {} });
  }, []);
  return (
    <ResultOfSearchPresentation
      queryResponse={props.queryResponse}
      goToMenu={goToMenu}
    />
  );
};
