import React, { useEffect, useState } from "react";
import { LoginPagePresentation } from "./LoginPagePresentation";
import { JardinApiService } from "../../../services/JardinApiService";
import { utils } from "../../../utilFunctions/utils";
import localStore from "store";

export const LoginPageContainer = (props) => {
  const [invalidCredentials, setInvalidCredentials] = useState(false); // Bandera para mostrar un simple mensaje, is las credenciales no son validas
  const [errorLoginReq, setErrorLoginReq] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;
    if (sessionToken) {
      props.setLogin(true);
    } else {
      console.log("Sesion vencida");
      props.setLogin(false);
    }

    if (!utils().isEmpty(props.credentials)) {
      const processLogin = JardinApiService().processLogin(
        props.credentials.username,
        props.credentials.password
      );
      processLogin
        .then((res) => {
          if (!res) {
            setErrorLoginReq(true);
            setLoading(false);
            setInvalidCredentials(false);
          }
          if (res?.data) {
            if (res.data?.validCredentials) {
              localStore.set("sessionToken", res.data.sessionToken);
              setInvalidCredentials(false);
              setErrorLoginReq(false);
              setLoading(false);
              props.setLogin(true);
            }

            if (res?.status === 404) {
              setInvalidCredentials(true);
              setErrorLoginReq(false);
              setLoading(false);
            }
            console.log(res?.status);
          }
        })
        .catch((err) => {
          if (err?.response) {
            if (err?.response?.status === 404) {
              localStore.remove("sessionToken");
              setInvalidCredentials(true);
            }
          }
        });
    }
  }, [props.credentials]);

  return (
    <LoginPagePresentation
      login={props.login}
      setLogin={props.setLogin}
      setCredentials={props.setCredentials}
      invalidCredentials={invalidCredentials}
      errorLoginReq={errorLoginReq}
      loading={loading}
      setLoading={setLoading}
      setErrorLogin={setErrorLoginReq}
      setInvalidCredentials={setInvalidCredentials}
    />
  );
};
