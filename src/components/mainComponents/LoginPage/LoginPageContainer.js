import React, {useEffect,useState} from "react";
import {LoginPagePresentation} from "./LoginPagePresentation";
import {JardinApiService} from "../../../services/JardinApiService";
import {utils} from "../../../utilFunctions/utils";



export const LoginPageContainer = (props) => {


    const [invalidCredentials,setInvalidCredentials] = useState(false) // Bandera para mostrar un simple mensaje, is las credenciales no son validas
    useEffect( () => {
        if(!utils().isEmpty(props.credentials)) {
            const processLogin = JardinApiService().processLogin(props.credentials.username,props.credentials.password)
            processLogin.then((res) => {

            if(res) {
                if(res.data) {
                    setInvalidCredentials(false)
                    props.setLogin(true)

                }
                if(res.status === 404) {
                    setInvalidCredentials(true)
                }
                console.log(res.status)
            }
            }).catch(err => {
                if(err.response.status === 404) {
                    console.log("catch de aca")
                    setInvalidCredentials(true)
                }
            })

        }
    },[props.credentials])

    return (
        <React.Fragment>
            <LoginPagePresentation login={props.login}
                                   setLogin={props.setLogin}
                                   setCredentials={props.setCredentials}
                                   invalidCredentials={invalidCredentials}
                                    />
        </React.Fragment>
        )
}


