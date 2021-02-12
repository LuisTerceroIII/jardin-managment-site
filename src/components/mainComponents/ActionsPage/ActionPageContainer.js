import { ActionPagePresentation } from "./ActionPagePresentation";
import React, { useEffect } from "react";
import localStore from "store";

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
  return <ActionPagePresentation paths={paths} logout={logout} />;
};
