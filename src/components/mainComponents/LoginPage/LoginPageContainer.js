import React, { useEffect, useState, useContext } from "react";
import { LoginPagePresentation } from "./LoginPagePresentation";
import { JardinApiService } from "../../../services/JardinApiService";
import { utils } from "../../../utilFunctions/utils";
import localStore from "store";
import LoggedUserContext from "../../../contexts/LoggedUserContext";

export const LoginPageContainer = (props) => {
  const userLogState = useContext(LoggedUserContext);
  const [invalidCredentials, setInvalidCredentials] = useState(false); // Bandera para mostrar un simple mensaje, is las credenciales no son validas
  const [errorLoginReq, setErrorLoginReq] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;
    if (sessionToken) {
      userLogState.setLogin(true);
    } else {
      console.log("Sesion vencida");
      userLogState.setLogin(false);
    }

    if (!utils().isEmpty(userLogState.credentials)) {
      const processLogin = JardinApiService().processLogin(
        userLogState.credentials.username,
        userLogState.credentials.password
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
              userLogState.setLogin(true);
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
  }, [userLogState.credentials]);

  return (
    <LoginPagePresentation
      invalidCredentials={invalidCredentials}
      errorLoginReq={errorLoginReq}
      loading={loading}
      setLoading={setLoading}
      setErrorLogin={setErrorLoginReq}
      setInvalidCredentials={setInvalidCredentials}
    />
  );
};
