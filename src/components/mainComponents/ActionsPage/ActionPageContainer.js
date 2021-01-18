import { ActionPagePresentation } from "./ActionPagePresentation";
import React from "react";
import {JardinApiService} from "../../../services/JardinApiService";

export const ActionPageContainer = (props) => {
    const logout = () => {
        props.setLogin(false)
        JardinApiService().logout(props.credentials).then( res => {
            if(res) {
                console.log(res.status)
            }
        })
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