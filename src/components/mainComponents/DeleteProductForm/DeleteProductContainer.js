import React, { useEffect, useState } from "react";
import { DeleteProductPresentation } from "./DeleteProductPresentation";
import { JardinApiService } from "../../../services/JardinApiService";
import { useHistory } from "react-router-dom";
import localStore from "store";

/*
* El componente de borrado tiene dos botones, 1 para buscar un producto por su id
* y otro para eliminar el producto que se le muestra tras la busqueda por id
* Esos botones se manejan con dos variables de estado.
* seacrhGarment y deleteGarment
* En el componente de vista, cuando se da click al boton de ID, se cambia searchGarment a true y garmentoTodeleteID con el numero recibido,
* useEffect de este componente escucha los cambios de searchGarment, y si este es verdadero hace una llamada a la API pidiendo el recurso con el id solicidato,
* una vez ya recibida la respuesta se cambia searchGarment a false.

* Lo mismo con el boton de deleteGarment, si deleteGarment es verdadero, se ejecuta useEffect y se hace un llamddo a la API con el id del recurso a eliminar.
* */

export const DeleteProductContainer = (props) => {
  //Garment que se renderiza en componente vista
  const [garmentToDelete, setGarmentToDelete] = useState({
    id: "",
    type: "",
    size: "",
    mainColor: "",
    gender: "",
    mainMaterial: "",
    madeIn: "",
    price: "",
    comment: "",
    images: {},
  });

  //Controla el id del recurso buscado.
  const [garmentToDeleteID, setGarmentToDeleteId] = useState("");
  //funciona como badnera, si esta activada se mostrara en vista una texto "Id no valido"
  const [idNotFound, setIDNotFound] = useState(false);
  const [idSearchStatus, setIdSearchStatus] = useState({
    loading: false,
    loaded: false,
    error: false,
  });
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    loaded: false,
    error: false,
  });
  //Bandera de botones, si deleteGarment = true -> llamada delete a la API
  const [deleteGarment, setDeleteGarment] = useState(false);
  //Bandera de boton busqueda, si searchGarment = true -> llamada get a la API
  const [searchGarment, setSearchGarment] = useState(false);

  //history es una variable de React-router-dom
  //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
  //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
  // history.push("/rutaAIr")
  const history = useHistory();
  const goLastPage = () => {
    history.goBack();
  };

  useEffect(() => {
    const sessionToken = localStore.get("sessionToken") || null;
    if (sessionToken) {
      //Entra si searchGamrnet es verdadero y si se ingreso un valor de id, es decir ya no es "" un string vacio, sino un numero
      if (searchGarment && garmentToDeleteID !== "") {
        setIdSearchStatus({
          loading: true,
          loaded: false,
          error: false,
        });
        setIDNotFound(false);
        const response = JardinApiService().getGarmentById(garmentToDeleteID);

        response.then((res) => {
          if (res) {
            if (res.status === 202) {
              const garment = res.data;
              const imagesReq = JardinApiService().getAllImagesLinks(
                res.data?.id
              );
              imagesReq.then((res) => {
                if (res?.status === 200) {
                  setIdSearchStatus({
                    loading: false,
                    loaded: true,
                    error: false,
                  });
                  setGarmentToDelete({
                    id: garment.id,
                    type: garment.type,
                    size: garment.size,
                    mainColor: garment.mainColor,
                    gender: garment.gender,
                    mainMaterial: garment.mainMaterial,
                    madeIn: garment.madeIn,
                    price: garment.price,
                    comment: garment.comment,
                    images: res.data,
                  });
                } else {
                  setIdSearchStatus({
                    loading: false,
                    loaded: false,
                    error: false,
                  });
                  setGarmentToDelete({
                    id: garment.id,
                    type: garment.type,
                    size: garment.size,
                    mainColor: garment.mainColor,
                    gender: garment.gender,
                    mainMaterial: garment.mainMaterial,
                    madeIn: garment.madeIn,
                    price: garment.price,
                    comment: garment.comment,
                    images: {},
                  });
                }
              });

              setIDNotFound(false);
            } else if (res.status === 401) {
              localStore.remove("sessionToken");
              props.setCredentials({});
              props.setLogin(false);
            } else if (res.status === 404) {
              setIdSearchStatus({
                loading: false,
                loaded: false,
                error: false,
              });
              setIDNotFound(true);
            } else {
              setIDNotFound(false);
              setIdSearchStatus({
                loading: false,
                loaded: false,
                error: true,
              });
            }
          } else {
            setIdSearchStatus({
              loading: false,
              loaded: false,
              error: true,
            });
          }
        });
        //Se setea searchGarment en falso para que no vuelva a entrar, salvo que se oprima el boton otra vez.
        setSearchGarment(false);
      }

      if (deleteGarment && garmentToDelete.id !== "") {
        setDeleteStatus({
          loading: true,
          loaded: false,
          error: false,
        });
        const deleteImagesReq = JardinApiService().deleteAllGarmentImages(
          garmentToDeleteID
        );
        deleteImagesReq.then((res) => {});

        const responseOfDelete = JardinApiService().deleteGarmentById(
          garmentToDelete.id,
          sessionToken
        );
        responseOfDelete.then((res) => {
          if (res) {
            //Preguntamos esto, para asegurarnos no tener errores de undefined o typeError
            if (res?.status === 401) {
              localStore.remove("sessionToken");
              props.setCredentials({});
              props.setLogin(false);
            }
            if (res?.status === 202) {
              setDeleteStatus({
                loading: false,
                loaded: false,
                error: false,
              });
              props.setDeleteResponse({
                id: garmentToDelete.id,
                type: garmentToDelete.type,
                size: garmentToDelete.size,
                mainColor: garmentToDelete.mainColor,
                gender: garmentToDelete.gender,
                mainMaterial: garmentToDelete.mainMaterial,
                madeIn: garmentToDelete.madeIn,
                price: garmentToDelete.price,
                comment: garmentToDelete.comment,
                images: {},
              });
              history.push("delete/result"); // Redirecciona a nueva ruta.
            }
            if (res?.status === 500 || !res) {
              setDeleteStatus({
                loading: false,
                loaded: false,
                error: true,
              });
            }
            if (res?.status === 404) {
              props.setDeleteResponse({
                // Se carga un objeto vacia para mostrar en la ruta "resultado"
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
              history.push("delete/result"); // Redirecciona a nueva ruta.
            }
          } else {
            setDeleteStatus({
              loading: false,
              loaded: false,
              error: true,
            });
          }
        });
        setDeleteGarment(false);
      }
    } else {
      console.log("Sesion vencida, esta vence cada 24hrs.");
      props.setCredentials({});
      localStore.remove("sessionToken");
      props.setLogin(false);
    }
  }, [searchGarment, deleteGarment]);

  return (
    <DeleteProductPresentation
      garmentToDelete={garmentToDelete}
      setGarmentToDelete={setGarmentToDelete}
      garmentToDeleteID={garmentToDeleteID}
      setGarmentToDeleteId={setGarmentToDeleteId}
      idNotFound={idNotFound}
      setDeleteGarment={setDeleteGarment}
      setSearchGarment={setSearchGarment}
      goLastPage={goLastPage}
      idSearchStatus={idSearchStatus}
      deleteStatus={deleteStatus}
    />
  );
};
