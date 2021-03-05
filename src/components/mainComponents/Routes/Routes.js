import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LoginPageContainer } from "../LoginPage/LoginPageContainer";
import { ActionPageContainer } from "../ActionsPage/ActionPageContainer";
import { CreateProductFormContainer } from "../CreateProductForm/CreateProductFormContainer";
import { SearchProductsContainer } from "../SearchProductsForm/SearchProductsContainer";
import { EditProductContainer } from "../EditProductForm/EditProductContainer";
import { DeleteProductContainer } from "../DeleteProductForm/DeleteProductContainer";
import { ResultOfCreateContainer } from "../ResultOfCreate/ResultOfCreateContainer";
import { ResultOfSearchContainer } from "../ResultOfSearch/ResultOfSearchContainer";
import { ResultOfEditContainer } from "../ResultOfEdit/ResultOfEditContainer";
import { ResultOfDeleteContainer } from "../ResultOfDelete/ResultOfDeleteContainer";
import { ImagesNewGarmentContainer } from "../ImagesNewGarment/ImagesNewGarmentContainer";
import LoggedUserContext from "../../../contexts/LoggedUserContext";
import "./RoutesView.css";

const Routes = () => {
  const userLogState = useContext(LoggedUserContext);
  return (
    <Router>
      {/*LOGIN PAGE*/}
      <Route exact path={"/"} component={"LoginPageContainer"}>
        {userLogState.login === true ? (
          <Redirect to={"/actions"} />
        ) : (
          <LoginPageContainer />
        )}
      </Route>

      {/*ACTIONS PAGE*/}
      <Route exact path={"/actions"} component={"ActionPageContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ActionPageContainer />
        )}
      </Route>

      {/***************************        MAIN PAGES: CREATE,SEARCH,EDIT,DELETE     **************************/}

      {/*CREATE NEW PRODUCT PAGE*/}
      <Route exact path={"/create"} component={"CreateProductFormContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <CreateProductFormContainer />
        )}
      </Route>
      {/*SEARCH PRODUCTS PAGE*/}
      <Route exact path={"/search"} component={"SearchProductFormContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <SearchProductsContainer />
        )}
      </Route>

      {/*EDIT PRODUCT PAGE*/}
      <Route exact path={"/edit"} component={"EditProductContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <EditProductContainer />
        )}
      </Route>

      {/*DELETE PAGE*/}
      <Route exact path={"/delete"} component={"DeleteProductContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <DeleteProductContainer />
        )}
      </Route>

      {/*********** SECONDARIES PAGES************/}

      {/*RESULT OF CREATE PAGE*/}
      <Route
        exact
        path={"/create/result"}
        component={"ResultOfCreateContainer"}
      >
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ResultOfCreateContainer />
        )}
      </Route>

      {/*RESULTS OF SEARCH PAGE*/}
      <Route
        exact
        path={"/search/results"}
        component={"ResultOfSearchContainer"}
      >
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ResultOfSearchContainer />
        )}
      </Route>

      {/*RESULTS OF EDIT PAGE*/}
      <Route exact path={"/edit/result"} component={"ResultOfEditContainer"}>
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ResultOfEditContainer />
        )}
      </Route>

      {/*RESULTS OF DELETE PAGE*/}
      <Route
        exact
        path={"/delete/result"}
        component={"ResultOfDeleteContainer"}
      >
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ResultOfDeleteContainer />
        )}
      </Route>

      {/*********************************************/}
      {/* Images Component*/}
      <Route
        exact
        path={"/create/upload-images"}
        component={"ImagesNewGarmentContainer"}
      >
        {userLogState.login === false ? (
          <Redirect to={"/"} />
        ) : (
          <ImagesNewGarmentContainer />
        )}
      </Route>
    </Router>
  );
};

export default Routes;
