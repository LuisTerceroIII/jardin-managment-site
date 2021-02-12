import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSearch,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./ActionPagePresentation.css";

export const ActionPagePresentation = (props) => {
  return (
    <div className={"action-page-view-main-container"}>
      <h1 className={"action-page-view-title"}> Acciones </h1>
      <ul className={"action-page-view-list"}>
        <li className={"form-presentation-button"}>
          <Link className={"action-page-view-link"} to={props.paths[0].path}>
            <div className={"action-page-action-button-container"}>
              <FontAwesomeIcon
                icon={faPlus}
                className={"action-page-view-link-icon"}
              />
              <p className={"action-page-view-link-name"}>
                {props.paths[0].name}
              </p>
            </div>
          </Link>
        </li>

        <li className={"form-presentation-button"}>
          <Link className={"action-page-view-link"} to={props.paths[1].path}>
            <div className={"action-page-action-button-container"}>
              <FontAwesomeIcon
                icon={faEdit}
                className={"action-page-view-link-icon"}
              />
              <p className={"action-page-view-link-name"}>
                {props.paths[1].name}
              </p>
            </div>
          </Link>
        </li>

        <li className={"form-presentation-button"}>
          <Link className={"action-page-view-link"} to={props.paths[2].path}>
            <div className={"action-page-action-button-container"}>
              <FontAwesomeIcon
                icon={faSearch}
                className={"action-page-view-link-icon"}
              />
              <p className={"action-page-view-link-name"}>
                {props.paths[2].name}
              </p>
            </div>
          </Link>
        </li>

        <li className={"form-presentation-button"}>
          <Link className={"action-page-view-link"} to={props.paths[3].path}>
            <div className={"action-page-action-button-container"}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={"action-page-view-link-icon"}
              />
              <p className={"action-page-view-link-name"}>
                {props.paths[3].name}
              </p>
            </div>
          </Link>
        </li>
      </ul>
      <button className={"form-presentation-button"} onClick={props.logout}>
        Cerrar Sesión
      </button>
    </div>
  );
};
