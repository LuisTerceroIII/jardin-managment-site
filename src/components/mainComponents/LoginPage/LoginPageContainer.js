import React, {useEffect,useState} from "react";
import {LoginPagePresentation} from "./LoginPagePresentation";
import {JardinApiService} from "../../../services/JardinApiService";
import {utils} from "../../../utilFunctions/utils";



export const LoginPageContainer = (props) => {

    const [credentials,setCredentials] = useState({})

    useEffect( () => {
        if(!utils().isEmpty(credentials)) {
            const processLogin = JardinApiService().processLogin(credentials.username,credentials.password)
            if(processLogin) props.setLogin(true)
            setCredentials({})
        }

    },[credentials])

    return (
        <React.Fragment>
            <LoginPagePresentation login={props.login}
                                   setLogin={props.setLogin}
                                   setCredentials={setCredentials}
                                    />
        </React.Fragment>
        )
}


