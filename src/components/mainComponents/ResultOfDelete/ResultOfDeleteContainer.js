import React from 'react'
import {ResultOfDeleteView} from "./ResultOfDeleteView";

export const ResultOfDeleteContainer = (props) => {

    return(
      <ResultOfDeleteView deleteResponse={props.deleteResponse}
      />
    )
}