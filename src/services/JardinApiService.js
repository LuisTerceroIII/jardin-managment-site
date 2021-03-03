import axios from "axios";
import localStore from "store";

export const JardinApiService = () => {
  const PORT = "8080";
  const jardinApiV1 = "management/jardin-api/v1";
  const localhostJardinAPI = `http://localhost:${PORT}/${jardinApiV1}`;
  const ipv4JardinAPI = "http://192.168.0.17:8080/management/jardin-api/v1";

  const processLogin = async (username, password) => {
    try {
      const response = await axios.post(
        /* `${localhostJardinAPI}/login`,*/
        `${ipv4JardinAPI}/login`,
        /*`192.168.0.17:3030/${jardinApiV1}/login`,*/
        {
          username: username || "hi", // Se agrego || y los datos comenzaros a llegar con valores completos al servidor. ?????.
          password: password || "5666",
        },
        {
          auth: {
            username: "LuisTerceroIII",
            password: "5611858Morf",
          },
        }
      );

      return response;
    } catch (err) {
      if (err.response) {
        const statusCodeRes = err.response.status;
        switch (statusCodeRes) {
          case 401:
            console.log("Expired session, login again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 404:
            console.log("Not valid credentials!");
            console.log("Credenciales no validas!");
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: request could not be sent");
            console.log("Error, no se a podido conectar con el servidor");
        }
        return err.response;
      }
    }
  };

  const validateSession = async () => {
    try {
      const sessionToken = localStore.get("sessionToken") || null;
      let validateSessionResponse = await axios({
        url: `${localhostJardinAPI}/validateSession`,
        /*       url: `${ipv4JardinAPI}/validateSession`,*/
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
      });
      return validateSessionResponse;
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
      return err.response;
    }
  };

  const getAllGarments = async (sessionToken) => {
    try {
      return await axios({
        url: `${localhostJardinAPI}/garment`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
      return null;
    }
  };

  const getGarmentById = async (id) => {
    try {
      const sessionToken = localStore.get("sessionToken") || null;
      return await axios({
        /*url: `${localhostJardinAPI}/garment/${id}`,*/
        url: `${ipv4JardinAPI}/garment/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        params: {
          id: id || null,
        },
      });
    } catch (err) {
      if (err?.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
        return err.response;
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return err.response;
      }
    }
  };

  const getGarmentByQuery = async (
    queryGarment,
    sessionToken,
    limit,
    offset
  ) => {
    try {
      return await axios({
        /*url: `${localhostJardinAPI}/garments/${limit}/${offset}`,*/
        url: `${ipv4JardinAPI}/garments/${limit}/${offset}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        params: {
          gender: queryGarment.gender || "",
          size: queryGarment.size || "",
          type: queryGarment.type || "",
          madeIn: queryGarment.madeIn || "",
          mainMaterial: queryGarment.mainMaterial || "",
          priceFrom: queryGarment.priceFrom || 0,
          priceTo: queryGarment.priceTo || 0,
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCodeRes = err.response.status;
        switch (statusCodeRes) {
          case 401:
            console.log("Expired session, login again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
        return err.response;
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
    }
  };

  const getSearchTotalElements = async (queryGarment) => {
    const sessionToken = localStore.get("sessionToken") || null;
    try {
      return await axios({
        /*url: `${localhostJardinAPI}/garments/search/count-rows`,*/
        url: `${ipv4JardinAPI}/garments/search/count-rows`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        params: {
          gender: queryGarment.gender || "",
          size: queryGarment.size || "",
          type: queryGarment.type || "",
          madeIn: queryGarment.madeIn || "",
          mainMaterial: queryGarment.mainMaterial || "",
          priceFrom: queryGarment.priceFrom || 0,
          priceTo: queryGarment.priceTo || 0,
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
    }
  };

  const postGarment = async (garment, sessionToken) => {
    try {
      return await axios({
        /*url: `${localhostJardinAPI}/garment`,*/
        url: `${ipv4JardinAPI}/garment`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        data: garment,
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
        return err.response;
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return err.response;
      }
    }
  };

  const patchGarmentById = async (garmentToUpdate, sessionToken) => {
    const { id } = garmentToUpdate;
    try {
      return await axios({
        /*url: `${localhostJardinAPI}/garment/${id}`,*/
        url: `${ipv4JardinAPI}/garment/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        data: {
          gender: garmentToUpdate.gender || null,
          size: garmentToUpdate.size || null,
          type: garmentToUpdate.type || null,
          madeIn: garmentToUpdate.madeIn || null,
          mainMaterial: garmentToUpdate.mainMaterial || null,
          price: garmentToUpdate.price || null,
          comment: garmentToUpdate.comment || null,
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: ", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
      return err.response;
    }
  };

  const deleteGarmentById = async (id, sessionToken) => {
    try {
      return await axios({
        /*url: `http://localhost:3030/management/jardin-api/v1/garment/${id}`,*/
        url: `${ipv4JardinAPI}/garment/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
        }
        return err.response;
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return err.response;
      }
    }
  };

  const postGarmentImage = async (id, imageNumber, formData) => {
    const sessionToken = localStore.get("sessionToken") || null;
    try {
      return await axios({
        /*url: `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,*/
        url: `${ipv4JardinAPI}/garment-images/${id}/${imageNumber}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            return err.response;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            return err.response;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
            return err.response;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err.response;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err.response;
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return err.response;
      }
    }
  };
  const getGarmentImage = async (id, imageNumber) => {
    const sessionToken = localStore.get("sessionToken") || null;

    /*
    Ruta localhost - desktop
    `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,
    */

    try {
      return await axios.get(
        `${ipv4JardinAPI}/garment-images/${id}/${imageNumber}`,
        {
          headers: {
            sessionToken: sessionToken,
          },
          auth: {
            username: "LuisTerceroIII",
            password: "5611858Morf",
          },
        }
      );
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            return err.response;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            return err.response;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
            return err.response;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err.response;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
    }
  };
  const deleteGarmentImage = async (id, imageNumber) => {
    const sessionToken = localStore.get("sessionToken") || null;
    /* Ruta local host - Desktop
    `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,*/
    try {
      return await axios.delete(
        `${ipv4JardinAPI}/garment-images/${id}/${imageNumber}`,
        {
          headers: {
            sessionToken: sessionToken,
          },
          auth: {
            username: "LuisTerceroIII",
            password: "5611858Morf",
          },
        }
      );
    } catch (err) {
      if (err.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            return err;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            return err;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
            return err;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err;
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return { status: 500 };
      }
    }
  };

  const deleteAllGarmentImages = async (id) => {
    const sessionToken = localStore.get("sessionToken") || null;
    /*`http://localhost:3030/management/jardin-api/v1/garment-images/${id}`,*/
    try {
      return await axios.delete(`${ipv4JardinAPI}/garment-images/${id}`, {
        headers: {
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            return err;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            return err;
          case 400:
            console.log("No images", err);
            console.log("No hay images ", err);
            return err;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            return err;
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
        return { status: 500 };
      }
    }
  };

  const getAllImagesLinks = async (id) => {
    const sessionToken = localStore.get("sessionToken") || null;
    /*`http://localhost:3030/management/jardin-api/v1/garment-images/${id}`,*/
    try {
      return await axios.get(`${ipv4JardinAPI}/garment-images/${id}`, {
        headers: {
          sessionToken: sessionToken,
        },
        auth: {
          username: "LuisTerceroIII",
          password: "5611858Morf",
        },
        params: {
          id: id,
        },
      });
    } catch (err) {
      if (err.response) {
        const statusCode = err.response?.status;
        switch (statusCode) {
          case 401:
            console.log("Expired session, log in again", err);
            console.log("Sesion expirada, ingresa nuevamente", err);
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 500:
            console.log("Error: fail server", err);
            console.log("Error, no se a podido conectar con el servidor", err);
            break;
          default:
            console.log("Error: request could not be sent", err);
            console.log("Error, no se a podido conectar con el servidor", err);
        }
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
    }
  };

  return {
    processLogin: processLogin,
    validateSession: validateSession,
    getAll: getAllGarments,
    getGarmentById: getGarmentById,
    getGarmentByQuery: getGarmentByQuery,
    postGarment: postGarment,
    patchGarmentById: patchGarmentById,
    deleteGarmentById: deleteGarmentById,
    postGarmentImage: postGarmentImage,
    getGarmentImage: getGarmentImage,
    deleteGarmentImage: deleteGarmentImage,
    getAllImagesLinks: getAllImagesLinks,
    deleteAllGarmentImages: deleteAllGarmentImages,
    getSearchTotalElements: getSearchTotalElements,
  };
};
