import React, { useEffect } from "react";
import { ResultOfDeleteView } from "./ResultOfDeleteView";
import { useHistory } from "react-router-dom";

export const ResultOfDeleteContainer = (props) => {
  const history = useHistory();
  const goToMenu = () => {
    history.push("/actions");
  };

  useEffect(() => {
    console.log(props.deleteResponse);
  }, []);

  return (
    <ResultOfDeleteView
      deleteResponse={props.deleteResponse}
      goToMenu={goToMenu}
    />
  );
};
