import { ActionPagePresentation } from "./ActionPagePresentation";
import React, {useEffect} from "react";
import {JardinApiService} from "../../../services/JardinApiService";
import Cookie from "js-cookie"
import localStore from "store";

export const ActionPageContainer = (props) => {
   /* useEffect(() => {
    },[])*/
    const logout = () => {
        localStore.remove("sessionToken")
        props.setLogin(false)
        props.setCredentials({})
    }
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
        <ActionPagePresentation  paths={paths} logout={logout}/>
    )
}