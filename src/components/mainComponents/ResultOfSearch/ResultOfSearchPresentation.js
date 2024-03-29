import React from "react";
import "./ResultOfSearchPresentation.css";
import ReactPaginate from "react-paginate";
import ProductCardGroupContainer from "../../secundaryComponents/ProductCardGroup/ProductCardGroupContainer";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";

export const ResultOfSearchPresentation = (props) => {
  return (
    <div className={"search-result-main-container"}>
      <div
        className={"return-last-page-arrow-search"}
        onClick={() => props.goLastPage()}
      >
        <FontAwesomeIcon icon={faHandPointLeft} />
      </div>
      <div className={"search-result-error-container"}>
        {props.error && (
          <span className={"search-results-server-connection-error-icon"}>
            {" "}
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </span>
        )}
        {props.error && (
          <span className={"search-results-server-connection-error-message"}>
            Error conectando con el servidor, intentalo mas tarde ...
          </span>
        )}
      </div>

      {props.loading && (
        <Loader
          className={"spinner-result-of-search"}
          type="TailSpin"
          color="#00a6de"
          height={80}
          width={80}
          radius={0}
        />
      )}
      {props.loaded && <h1 className={"result-search-title"}>Resultados</h1>}
      {props.loaded && props.garments.length !== 0 && (
        <div className={"search-result-product-card-group-main-container"}>
          {" "}
          <ProductCardGroupContainer garments={props.garments} />
        </div>
      )}
      {(props.loaded || props.garments.length !== 0) && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={props.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={6}
          onPageChange={({ selected }) => {
            props.setLoaded(false);
            props.setLoading(true);
            props.setOffset(selected * props.limit); // numero de pagina * limit = offset
          }}
          containerClassName={"search-result-pagination-main-container"}
          pageLinkClassName={"search-result-pagination-inactive-pages"}
          subContainerClassName={""}
          activeClassName={"search-result-pagination-active-page"}
          previousClassName={"search-result-pagination-previous-bottom"}
          nextClassName={"search-result-pagination-next-bottom"}
        />
      )}
      <button
        className={"form-presentation-crate-button form-presentation-button"}
        onClick={props.goToMenu}
      >
        Volver
      </button>
    </div>
  );
};
