import React, { useState, useEffect } from "react";
import LoggedUserContext from "./contexts/LoggedUserContext";
import JardinReqAndResContext from "./contexts/JardinReqResContext";
import Routes from "./components/mainComponents/Routes/Routes";

/*
    La aplicación "Jardín Managment" es un "CRUD" con el objetivo de brindar una opción amigable
    al manejo de stock de la tienda "Jardín".
    La meta es crear una interfaz grafica para la API de Jardín, de este modo a través del manejo de esta aplicación
    regular el contenido de la pagina web uqe muestra los productos de la API.
* */

function App() {
  //login variable control if user give valid credentials
  //Login variable controls the access to other pages. If login is false, no one can pass the login page.
  const [login, setLogin] = useState(false);
  const [credentials, setCredentials] = useState({});

  // Variables utilizadas para buscar productos.
  //SearchProductsContainer usa : searchResponse y setSearchResponse
  //SearchProductsPresentation usa : setSearchRequest
  //ResultOfSearchContainer usa : setSearchRequest
  //ResultOfSearchPresentation usa : searchResponse
  const [searchResponse, setSearchResponse] = useState([]);
  const [searchRequest, setSearchRequest] = useState({
    query: {},
  });
  /*
        Variables utilizadas por los componentes "Create" y "ResultOfCreate"
        CreateProductFormContainer usa : setCreateResponse , createRequest.newGarment
        CreateProductFormPresentation usa : setCreateRequest
        ResultOfCreateContainer usa : setCreateRequest({})
        ResultOfCreatePresentation usa: createResponse
      */
  const [createRequest, setCreateRequest] = useState({
    newGarment: {},
  });
  const [createResponse, setCreateResponse] = useState({
    created: false,
    newGarment: {},
  });

  const [editRequest, setEditRequest] = useState({
    garmentToUpdate: {},
  });

  const [editResponse, setEditResponse] = useState({
    updatedGarment: {},
  });

  const [deleteResponse, setDeleteResponse] = useState({
    deletedGarment: {},
  });

  useEffect(() => {}, []);

  return (
    <LoggedUserContext.Provider
      value={{
        setCredentials: setCredentials,
        setLogin: setLogin,
        login: login,
        credentials: credentials,
      }}
    >
      <JardinReqAndResContext.Provider
        value={{
          createRequest: createRequest,
          setCreateRequest: setCreateRequest,
          createResponse: createResponse,
          setCreateResponse: setCreateResponse,
          editRequest: editRequest,
          setEditRequest: setEditRequest,
          editResponse: editResponse,
          setEditResponse: setEditResponse,
          searchRequest: searchRequest,
          setSearchRequest: setSearchRequest,
          searchResponse: searchResponse,
          setSearchResponse: setSearchResponse,
          deleteResponse: deleteResponse,
          setDeleteResponse: setDeleteResponse,
        }}
      >
        <Routes />
      </JardinReqAndResContext.Provider>
    </LoggedUserContext.Provider>
  );
}

export default App;
