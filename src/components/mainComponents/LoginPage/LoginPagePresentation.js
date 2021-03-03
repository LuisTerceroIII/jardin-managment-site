import React, { useEffect } from "react";
import "./LoginPagePresentation.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";

export const LoginPagePresentation = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    props.setLoading(true);
    props.setErrorLogin(false);
    props.setInvalidCredentials(false);
    props.setCredentials({
      username: data.username,
      password: data.password,
    });
  };

  useEffect(() => {}, [props.invalidCredentials]);

  return (
    <div className={"welcomePage-main-container"}>
      <div className={"logo-container"}>
        <h1 className={"welcomePage-title"}>JARDÍN</h1>
        <h1 className={"welcomePage-title"}>MANAGEMENT</h1>
      </div>

      <form
        className={"login-form-main-container"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"input-container"}>
          <label
            className={"label-login-input label-login-input-username"}
            id={"username"}
          >
            Usuario
          </label>
          <input
            className={"login-input"}
            name={"username"}
            ref={register({
              required: true,
              minLength: 2,
            })}
          />
          {errors.username && (
            <span className={"username-required-error"}>Ingrese usuario</span>
          )}
        </div>

        <div className={"input-container"}>
          <label
            className={"label-login-input label-login-input-pass"}
            id={"password"}
          >
            Contraseña
          </label>
          <input
            type={"password"}
            name={"password"}
            className={"login-input"}
            ref={register({
              required: true,
              minLength: 2,
            })}
          />
          {errors.password && (
            <span className={"password-required-error"}>
              Ingrese contraseña
            </span>
          )}
          {props.invalidCredentials && (
            <span className={"login-invalid-credentials-icon"}>
              {" "}
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
          )}
          {props.invalidCredentials && (
            <span className={"login-invalid-credentials-message"}>
              Credenciales invalidas!
            </span>
          )}
          {props.loading && (
            <Loader
              className={"spinner-result-of-search"}
              type="Oval"
              color="#00a6de"
              height={35}
              width={35}
              radius={0}
            />
          )}
        </div>
        <div className={"login-error-container"}>
          {props.errorLoginReq && (
            <span className={"login-server-error-icon"}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          )}
          {props.errorLoginReq && (
            <span className={"login-server-error-message"}>
              Error conectando con el servidor, intentalo mas tarde ...
            </span>
          )}
        </div>

        <button className={"login-submit-button"} type={"submit"}>
          Entrar
        </button>
      </form>
    </div>
  );
};
