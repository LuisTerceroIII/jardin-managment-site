import React, { useEffect, useState } from "react";
import { CreateProductFormPresentation } from "./CreateProductFormPresentation.js";
import { useHistory } from "react-router-dom";
import { utils } from "../../../utilFunctions/utils";
import { JardinApiService } from "../../../services/JardinApiService";
import localStore from "store";

//TODO: Mostrar alertas de error al recibir como respueta 500 o otro status de error.
export const CreateProductFormContainer = (props) => {
  //history es una variable de React-router-dom
  //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
  //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
  // history.push("/rutaAIr")
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const goLastPage = () => {
    history.goBack();
  };
  /*
        Si createRequest.newGarment se actualiza se ejecuta useEffect:

            Si hay  respuesta ejecutar:
                Se setea la respuesta setCreateResponse(respuesta.data).

                Si createRequest.newGarment no esta vacio y respuesta.data == true:
                     redirect to = /create/result
                     Muestra "Creacion exitosa"

                Si createRequest.newGarment no esta vacio y respuesta.data == false:
                     redirect to = /create/result
                     Muestra "Creacion no exitosa"

                Estos dos parecen redundantes, pero nos
     */

  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;

    if (sessionToken) {
      // Valida que se este navegando con una sesion abierta
      if (!utils().isEmpty(props.createRequest.newGarment)) {
        setLoading(true);
        setError(false);
        // valida que se llame
        const postGarmentReq = JardinApiService().postGarment(
          props.createRequest.newGarment,
          sessionToken
        );
        postGarmentReq.then((res) => {
          if (res) {
            // valida que exista algo como respuesta
            let response = res?.data;

            props.setCreateResponse({
              created: response?.created,
              newGarment: response?.createdGarment,
            }); // se setea la respuesta para actualizar el estado del componente de resultado
            if (res?.status === 401) {
              // Valida, si falla por token invalido
              // se vuelven todos los estado que comprueban el logeo a su estado inicial.
              localStore.remove("sessionToken");
              props.setCredentials({});
              props.setLogin(false);
            }
            if (
              !utils().isEmpty(props.createRequest.newGarment) &&
              response?.created &&
              res?.status !== 500
            ) {
              setError(true);
              setLoading(false);
              history.push("/create/upload-images");
            }

            if (
              !utils().isEmpty(props.createRequest.newGarment) &&
              response?.created === false &&
              res?.status !== 500
            ) {
              setError(true);
              setLoading(false);
              history.push("/create/upload-images");
            }
          } else {
            setError(true);
            setLoading(false);
          }
        });
      }
    } else {
      console.log("Sesion vencida, esta vence cada 24hrs.");
      props.setCredentials({});
      localStore.remove("sessionToken");
      props.setLogin(false);
    }
  }, [props.createRequest.newGarment]);

  return (
    <CreateProductFormPresentation
      setCreateRequest={props.setCreateRequest}
      goLastPage={goLastPage}
      loading={loading}
      error={error}
    />
  );
};
