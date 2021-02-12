import React, { useState, useEffect } from "react";
import { EditProductPresentation } from "./EditProductPresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";
import localStore from "store";

export const EditProductContainer = (props) => {
  //history es una variable de React-router-dom
  //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
  //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
  // history.push("/rutaAIr")
  const history = useHistory();
  const goLastPage = () => {
    history.goBack();
  };

  const [garmentToUpdate, setGarmentToUpdate] = useState({
    id: "",
    type: "",
    size: "",
    mainColor: "",
    gender: "",
    mainMaterial: "",
    madeIn: "",
    price: "",
    comment: "",
  });

  const [garmentToUpdateId, setGarmentToUpdateId] = useState("");

  const [searchGarment, setSearchGarment] = useState(false);
  const [patchGarment, setPatchGarment] = useState(false);

  const [idNotFound, setIDNotFound] = useState(false);

  // Esta variable regula que se recarge el componente MiniUploadImageGroup, ya que este componente se conecta con la API, pide los links
  // de las images, y si un link cambia, es decir, se sube una imagen o se borra otra, se cambia este estado y se actualizan las images.
  const [refreshImages, setRefreshImages] = useState(true);

  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;

    if (sessionToken) {
      if (searchGarment === true) {
        const response = JardinApiService().getGarmentById(garmentToUpdateId);
        response.then((garment) => {
          if (garment?.status === 401) {
            localStore.remove("sessionToken");
            props.setCredentials({});
            props.setLogin(false);
          }
          if (garment?.status === 404) {
            setIDNotFound(true);
            setGarmentToUpdate({
              id: "",
              type: "",
              size: "",
              mainColor: "",
              gender: "",
              mainMaterial: "",
              madeIn: "",
              price: "",
              comment: "",
            });
          }
          if (garment?.status === 500) {
            console.log("Error interno del servidor");
            setIDNotFound(false);
            setGarmentToUpdate({
              id: "",
              type: "",
              size: "",
              mainColor: "",
              gender: "",
              mainMaterial: "",
              madeIn: "",
              price: "",
              comment: "",
            });
          }
          if (garment?.status === 202) {
            setIDNotFound(false);
            setGarmentToUpdate(garment.data);
            console.log(garment.data);
            props.setEditResponse(garment.data);
            setRefreshImages(true);
          }
        });
        setSearchGarment(false);
      }
      if (patchGarment === true) {
        setPatchGarment(false);
        const response = JardinApiService().patchGarmentById(
          props.editRequest,
          sessionToken
        );
        response.then((res) => {
          if (res?.status === 401) {
            localStore.remove("sessionToken");
            props.setCredentials({});
            props.setLogin(false);
          }
          props.setEditResponse(res.data);
          history.push("/edit/result");
        });
      }
    } else {
      console.log("Sesion vencida, esta vence cada 24hrs.");
      props.setCredentials({});
      localStore.remove("sessionToken");
      props.setLogin(false);
    }
  }, [props.editRequest, searchGarment]);

  return (
    <EditProductPresentation
      garmentToUpdate={garmentToUpdate}
      setGarmentToUpdate={setGarmentToUpdate}
      setGarmentToUpdateId={setGarmentToUpdateId}
      garmentToUpdateId={garmentToUpdateId}
      setSearchGarment={setSearchGarment}
      setPatchGarment={setPatchGarment}
      setEditRequest={props.setEditRequest}
      idNotFound={idNotFound}
      setCredentials={props.setCredentials}
      setLogin={props.setLogin}
      setRefresh={setRefreshImages}
      refresh={refreshImages}
      goLastPage={goLastPage}
    />
  );
};
