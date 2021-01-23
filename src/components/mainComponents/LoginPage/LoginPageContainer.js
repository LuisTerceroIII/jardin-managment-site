import React, {useEffect,useState} from "react";
import {LoginPagePresentation} from "./LoginPagePresentation";
import {JardinApiService} from "../../../services/JardinApiService";
import {utils} from "../../../utilFunctions/utils";
import Cookie from 'js-cookie'
import localStore from 'store'


export const LoginPageContainer = (props) => {


    const [invalidCredentials,setInvalidCredentials] = useState(false) // Bandera para mostrar un simple mensaje, is las credenciales no son validas
    useEffect( () => {
        const sessionToken = localStore.get("sessionToken") || null
        console.log("Este es sessionToken : " , sessionToken)
        if(sessionToken) {
            props.setLogin(true)
        } else {
            console.log("Sesion vencida",sessionToken)
            props.setLogin(false)
        }


        if(!utils().isEmpty(props.credentials)) {
            const processLogin = JardinApiService().processLogin(props.credentials.username,props.credentials.password)
            processLogin.then((res) => {
            if(res.data) {

                if(res.data.validCredentials) {
                    localStore.set("sessionToken",res.data.sessionToken+"alksdjklajsldkj")
                    setInvalidCredentials(false)
                    props.setLogin(true)

                }

                if(res.status === 404) {
                    setInvalidCredentials(true)

                }
                console.log(res.status)

            }
            }).catch(err => {
                if(err.response) {
                    if(err.response.status === 404) {
                        localStore.remove("sessionToken")
                        setInvalidCredentials(true)
                    }
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


