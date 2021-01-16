import React , { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginPageContainer } from "./components/mainComponents/LoginPage/LoginPageContainer";
import { CreateProductFormContainer } from "./components/mainComponents/CreateProductForm/CreateProductFormContainer";
import {ActionPageContainer} from "./components/mainComponents/ActionsPage/ActionPageContainer";
import {SearchProductsContainer} from "./components/mainComponents/SearchProductsForm/SearchProductsContainer";
import {EditProductContainer} from "./components/mainComponents/EditProductForm/EditProductContainer";
import {DeleteProductContainer} from "./components/mainComponents/DeleteProductForm/DeleteProductContainer";
import {ResultOfSearchContainer} from "./components/mainComponents/ResultOfSearch/ResultOfSearchContainer";
import './App.css';
import {ResultOfCreateContainer} from "./components/mainComponents/ResultOfCreate/ResultOfCreateContainer";
import {ResultOfEditContainer} from "./components/mainComponents/ResultOfEdit/ResultOfEditContainer";
import {ResultOfDeleteContainer} from "./components/mainComponents/ResultOfDelete/ResultOfDeleteContainer";


/*
    La aplicación "Jardín Managment" es un "CRUD" con el objetivo de brindar una opción amigable
    al manejo de stock de la tienda "Jardín".
    La meta es crear una interfaz grafica para la API de Jardín, de este modo a través del manejo de esta aplicación
    regular el contenido de la pagina web uqe muestra los productos de la API.
* */

 function App() {
    //login variable control if user give valid credentials
     //Login variable controls the access to other pages. If login is false, no one can pass the login page.
    const [login,setLogin] = useState(false)

    // Variables utilizadas para buscar productos.
     //SearchProductsContainer usa : query y setQueryResponse
     //SearchProductsPresentation usa : setQuery
     //ResultOfSearchContainer usa : setQuery
     //ResultOfSearchPresentation usa : queryResponse
    const [queryResponse,setQueryResponse] = useState([])
    const [query,setQuery] = useState({
         query : {}
        })
     /*
        Variables utilizadas por los componentes "Create" y "ResultOfCreate"
        CreateProductFormContainer usa : setCreateResponse , createRequest.newGarment
        CreateProductFormPresentation usa : setCreateRequest
        ResultOfCreateContainer usa : setCreateRequest({})
        ResultOfCreatePresentation usa: createResponse
      */
     const [createRequest,setCreateRequest] = useState({
         newGarment : {}
     })
     const [createResponse,setCreateResponse] = useState(false)

     const [editRequest,setEditRequest] = useState({
         garmentToUpdate: {}
     })

     const [editResponse, setEditResponse] = useState({
         updatedGarment : {}
     })

     const [deleteResponse,setDeleteResponse] = useState({
         deletedGarment : {}
     })

    return (
        <Router >

            {/*LOGIN PAGE*/}
          <Route exact path={'/'} component={'LoginPageContainer'}>
              {login === true ? <Redirect to={'/actions'}/> : <LoginPageContainer login={login} setLogin={setLogin}/>}
          </Route>

            {/*ACTIONS PAGE*/}
          <Route exact path={'/actions'} component={'ActionPageContainer'}>
              {login === false ? <Redirect to={'/'}/> : <ActionPageContainer/> }
          </Route>

          {/***************************        MAIN PAGES: CREATE,SEARCH,EDIT,DELETE     **************************/}

            {/*CREATE NEW PRODUCT PAGE*/}
          <Route exact path={'/create'} component={'CreateProductFormContainer'}>
                {login === false ? <Redirect to={'/'}/> : <CreateProductFormContainer  createRequest={createRequest}
                                                                                       setCreateRequest={setCreateRequest}
                                                                                       setCreateResponse={setCreateResponse}

                />}
          </Route>
            {/*SEARCH PRODUCTS PAGE*/}
          <Route exact path={'/search'} component={'SearchProductFormContainer'}>
                {login === false ? <Redirect to={'/'}/> : <SearchProductsContainer setQueryResponse={setQueryResponse}
                                                                                   setQuery={setQuery}
                                                                                   query={query}/>}
          </Route>

            {/*EDIT PRODUCT PAGE*/}
          <Route exact path={'/edit'} component={'EditProductContainer'}>
              {login === false ? <Redirect to={'/'}/> : <EditProductContainer  editRequest={editRequest}
                                                                               setEditRequest={setEditRequest}
                                                                               setEditResponse={setEditResponse} /> }
          </Route>

            {/*DELETE PAGE*/}
          <Route exact path={'/delete'} component={'DeleteProductContainer'}>
              {login === false ? <Redirect to={'/'}/> : <DeleteProductContainer setDeleteResponse={setDeleteResponse}
              /> }
          </Route>

            {/*********** SECONDARY PAGES************/}

            {/*RESULT OF CREATE PAGE*/}
            <Route exact path={'/create/result'} component={'ResultOfCreateContainer'}>
                {login === false ? <Redirect to={'/'}/> : <ResultOfCreateContainer
                    setCreateRequest={setCreateRequest}  createResponse={createResponse}/>   }
            </Route>

            {/*RESULTS OF SEARCH PAGE*/}
          <Route exact path={'/search/results'} component={'ResultOfSearchContainer'}>
              {login === false ? <Redirect to={'/'}/> : <ResultOfSearchContainer  setQuery={setQuery} queryResponse={queryResponse}/> }
          </Route>

            {/*RESULTS OF EDIT PAGE*/}
            <Route exact path={'/edit/result'} component={'ResultOfEditContainer'}>
                {login === false ? <Redirect to={'/'}/> : <ResultOfEditContainer  setEditRequest={setEditRequest} editResponse={editResponse}/> }
            </Route>

            {/*RESULTS OF DELETE PAGE*/}
            <Route exact path={'/delete/result'} component={'ResultOfDeleteContainer'}>
                {login === false ? <Redirect to={'/'}/> : <ResultOfDeleteContainer deleteResponse={deleteResponse}/> }
            </Route>

        </Router>
  );
}

export default App;
