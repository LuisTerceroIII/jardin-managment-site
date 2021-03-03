import { ActionPagePresentation } from "./ActionPagePresentation";
import React, { useEffect } from "react";
import localStore from "store";
import { JardinApiService } from "../../../services/JardinApiService";

export const ActionPageContainer = (props) => {
  const logout = () => {
    localStore.remove("sessionToken");
    props.setLogin(false);
    props.setCredentials({});
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
          props.setCredentials({});
          localStore.remove("sessionToken");
          props.setLogin(false);
        }
      }
    });
  }, []);
  return <ActionPagePresentation paths={paths} logout={logout} />;
};
