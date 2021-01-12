import { ActionPagePresentation } from "./ActionPagePresentation";
import React from "react";

export const ActionPageContainer = () => {
    const paths = [
        {
            name : "CREATE",
            path : "/create"
        },
        {
            name : "EDIT",
            path : "/edit"
        },
        {
            name : "SEARCH",
            path : "/search"
        },
        {
            name : "DELETE",
            path : "/delete"
        }
    ]
    return (
        <ActionPagePresentation  paths={paths}/>
    )
}