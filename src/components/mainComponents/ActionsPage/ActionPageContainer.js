import { ActionPagePresentation } from "./ActionPagePresentation";
import React, { useContext, useEffect } from "react";
import localStore from "store";
import { JardinApiService } from "../../../services/JardinApiService";
import LoggedUserContext from "../../../contexts/LoggedUserContext";

export const ActionPageContainer = (props) => {
  const userLogState = useContext(LoggedUserContext);
  const logout = () => {
    localStore.remove("sessionToken");
    userLogState.setLogin(false);
    userLogState.setCredentials({});
  };
  const paths = [
    {
      name: "CREAR",
      path: "/create",
    },
    {
      name: "EDITAR",
      path: "/edit",
    },
    {
      name: "BUSCAR",
      path: "/search",
    },
    {
      name: "BORRAR",
      path: "/delete",
    },
  ];

  useEffect(() => {
    const validateSession = JardinApiService().validateSession();
    validateSession.then((res) => {
      if (res) {
        if (res?.status === 401) {
          userLogState.setCredentials({});
          localStore.remove("sessionToken");
          userLogState.setLogin(false);
        }
      }
    });
    return null;
  }, []);
  return <ActionPagePresentation paths={paths} logout={logout} />;
};
