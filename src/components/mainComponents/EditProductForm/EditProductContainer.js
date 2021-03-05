import React, { useState, useEffect, useContext } from "react";
import { EditProductPresentation } from "./EditProductPresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";
import localStore from "store";
import LoggedUserContext from "../../../contexts/LoggedUserContext";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const EditProductContainer = (props) => {
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

  // Esta variable regula que se recarge el componente MiniUploadImageGroup, ya que este componente se conecta con la API, pide los links
  // de las images, y si un link cambia, es decir, se sube una imagen o se borra otra, se cambia este estado y se actualizan las images.
  const [refreshImages, setRefreshImages] = useState(true);

  // Variables de estado para busqueda de prenda Garment por Id.
  const [idNotFound, setIDNotFound] = useState(false);
  const [loadingID, setLoadingID] = useState(false);
  const [loadedID, setLoadedID] = useState(false);
  const [errorID, setErrorID] = useState(false);
  // Variables de estado para el boton de "Editar" que finaliza con la accion.
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadedEdit, setLoadedEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const [idRequiredMessage, setIdRequiredMessage] = useState(false);

  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;
    if (sessionToken) {
      if (searchGarment === true) {
        setLoadingID(true);
        setErrorID(false);
        setIDNotFound(false);
        const response = JardinApiService().getGarmentById(garmentToUpdateId);
        response.then((garment) => {
          if (!garment) {
            setErrorID(true);
            setLoadingID(false);
          }
          if (garment?.status === 401) {
            localStore.remove("sessionToken");
            userLogState.setCredentials({});
            userLogState.setLogin(false);
          }
          if (garment?.status === 404) {
            setIDNotFound(true);
            setLoadingID(false);
            setErrorID(false);
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
            setLoadingID(false);
            setErrorID(true);
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
            setLoadingID(false);
            setIDNotFound(false);
            setGarmentToUpdate(garment.data);
            JardinReqAndResStates.setEditResponse(garment.data);
            setRefreshImages(true);
          }
        });
        setSearchGarment(false);
      }

      if (patchGarment === true) {
        setLoadingEdit(true);
        setLoadedEdit(false);
        setErrorEdit(false);
        setIdRequiredMessage(false);
        setPatchGarment(false);
        const response = JardinApiService().patchGarmentById(
          JardinReqAndResStates.editRequest,
          sessionToken
        );
        response.then((res) => {
          if (res?.status === 401) {
            localStore.remove("sessionToken");
            userLogState.setCredentials({});
            userLogState.setLogin(false);
          } else if (res?.status === 500 || !res) {
            setLoadingEdit(false);
            setErrorEdit(true);
            setIdRequiredMessage(false);
          } else if (res?.status === 404) {
            setIdRequiredMessage(true);
            setLoadingEdit(false);
            setErrorEdit(false);
          } else {
            JardinReqAndResStates.setEditResponse(res.data);
            history.push("/edit/result");
          }
        });
      }
    } else {
      console.log("Sesion vencida, esta vence cada 24hrs.");
      userLogState.setCredentials({});
      localStore.remove("sessionToken");
      userLogState.setLogin(false);
    }
  }, [JardinReqAndResStates.editRequest, searchGarment]);

  return (
    <EditProductPresentation
      garmentToUpdate={garmentToUpdate}
      setGarmentToUpdate={setGarmentToUpdate}
      setGarmentToUpdateId={setGarmentToUpdateId}
      garmentToUpdateId={garmentToUpdateId}
      setSearchGarment={setSearchGarment}
      setPatchGarment={setPatchGarment}
      setRefresh={setRefreshImages}
      refresh={refreshImages}
      goLastPage={goLastPage}
      idNotFound={idNotFound}
      loadingID={loadingID}
      loadedID={loadedID}
      errorID={errorID}
      loadingEdit={loadingEdit}
      loadedEdit={loadedEdit}
      errorEdit={errorEdit}
      idRequiredMessage={idRequiredMessage}
    />
  );
};
