import React, { useContext, useEffect } from "react";
import { SearchProductsPresentation } from "./SearchProductsPresentation";
import { useHistory } from "react-router-dom";
import { utils } from "../../../utilFunctions/utils";
import localStore from "store";
import LoggedUserContext from "../../../contexts/LoggedUserContext";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

/*
    Recibe la variable de estado: "query" y "setQuery" y las Pasa a SearchProductsPresentation
    SearchProductsPresentation : Setea query con el valor del formulario.
    SearchProductsContainer : Useeffects escucha a query, cuando se actualiza con los valores del formulario
    hace la redirecion al compoenete que muestra los resultados con history.psuh("/results")
 */

//TODO: Recibir parametros de los selects en el formulario desde la API. De ese modo mostrar solo opciones posibles y validas.
export const SearchProductsContainer = (props) => {
  const userLogState = useContext(LoggedUserContext);
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  //history es una variable de React-router-dom
  //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
  //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
  // history.push("/rutaAIr")
  const history = useHistory();
  const goLastPage = () => {
    history.goBack();
  };

  // Dado que la variable de estado que fijamos para renderizar este componente es query
  // y cuando la respuesta se renderiza en "ResultOfSearch" se setea un objeto vacio.
  // Es necesario recordar que en la funcion useEffect(), si el objeto query no esta vacio,
  // se va hacia el path "/results" es decir al component "ResultOfSearchContainer"

  //Escucha los cambios en "JardinReqAndResStates.searchRequest", si "JardinReqAndResStates.searchRequest" no esta vacio, redireciona a mostrar los resultados de la busqueda.
  useEffect(() => {
    //console.log('Query ===',JardinReqAndResStates.searchRequest.query) --> Esta en la query con la que se trabaja. Por defecto se setea un obtejo vacio {}.
    const sessionToken = localStore.get("sessionToken") || null;
    if (sessionToken) {
      if (!utils().isEmpty(JardinReqAndResStates.searchRequest.query)) {
        history.push("/search/results");
      }
    } else {
      console.log("Sesion vencida, esta vence cada 24hrs.");
      userLogState.setCredentials({});
      localStore.remove("sessionToken");
      userLogState.setLogin(false);
    }
  }, [JardinReqAndResStates.searchRequest]);

  return <SearchProductsPresentation goLastPage={goLastPage} />;
};
