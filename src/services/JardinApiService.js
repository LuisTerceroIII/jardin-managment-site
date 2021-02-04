import axios from "axios";

export const JardinApiService = () => {
  const processLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/management/jardin-api/v1/login",
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

      console.log(response.data?.validCredentials); // Respuesta servidor, se espera un True o False. -> response.data
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

  const getAllGarments = async (sessionToken) => {
    try {
      return await axios({
        url: `http://localhost:3030/management/jardin-api/v1/garment`,
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

  const getGarmentById = async (id, sessionToken) => {
    try {
      return await axios({
        url: `http://localhost:3030/management/jardin-api/v1/garment/${id}`,
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

  const getGarmentByQuery = async (queryGarment, sessionToken) => {
    try {
      return await axios({
        url: "http://localhost:3030/management/jardin-api/v1/garment/search",
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

  const saveWithoutPictures = async (garment, sessionToken) => {
    try {
      return await axios({
        url: "http://localhost:3030/management/jardin-api/v1/garment/post",
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
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
      return err.response;
    }
  };

  const patchGarmentById = async (garmentToUpdate, sessionToken) => {
    const { id } = garmentToUpdate;
    try {
      return await axios({
        url: `http://localhost:3030/management/jardin-api/v1/garment/${id}`,
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
    }
  };

  const deleteGarmentById = async (id, sessionToken) => {
    try {
      return await axios({
        url: `http://localhost:3030/management/jardin-api/v1/garment/delete/${id}`,
        method: "POST",
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
      } else {
        console.log("Error: request could not be sent");
        console.log("Error, no se a podido conectar con el servidor");
      }
    }
  };

  const postGarmentImage = async (id, imageNumber, formData, sessionToken) => {
    console.log(id);
    try {
      return await axios.post(
        `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
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
  const getGarmentImage = async (id, imageNumber, sessionToken) => {
    try {
      return await axios.get(
        `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,
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
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
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
  const deleteGarmentImage = async (id, imageNumber, sessionToken) => {
    try {
      return await axios.delete(
        `http://localhost:3030/management/jardin-api/v1/garment-images/${id}/${imageNumber}`,
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
            break;
          case 404:
            console.log("Invalid ID", err);
            console.log("ID invalido", err);
            break;
          case 400:
            console.log("Image number must be in the range of 1 to 6", err);
            console.log("El numero de imagen debe estar entre 1 y 6 ", err);
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
  //TODO: Respuestas 200 ok,401,404,500
  const getAllImagesLinks = async (id, sessionToken) => {
    try {
      return await axios.get(
        `http://localhost:3030/management/jardin-api/v1/garment-images/${id}`,
        {
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
        }
      );
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
    getAll: getAllGarments,
    getGarmentById: getGarmentById,
    getGarmentByQuery: getGarmentByQuery,
    saveWithoutPictures: saveWithoutPictures,
    patchGarmentById: patchGarmentById,
    deleteGarmentById: deleteGarmentById,
    postGarmentImage: postGarmentImage,
    getGarmentImage: getGarmentImage,
    deleteGarmentImage: deleteGarmentImage,
    getAllImagesLinks: getAllImagesLinks,
  };
};
