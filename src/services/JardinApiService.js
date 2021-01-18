import axios from "axios";

export const JardinApiService = () => {

    const processLogin = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3030/management/jardin-api/v1/login",{
                username : username || "hi", // Se agrego || y los datos comenzaros a llegar con valores completos al servidor. ?????.
                password : password || "5666"
            },{
                auth : {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                }
            })
            console.log(response.data) // Respuesta servidor, se espera un True o False. -> response.data
            return response

        } catch (err) {
            if(err.response) {
                if(err.response.status === 404) {
                    console.log("Not valid credentials!")
                    console.log("Credenciales no validas!")
                }
                if(err.response.status === 500) {
                    console.log("Error: request could not be sent",err)
                    console.log("Error, no se a podido conectar con el servidor",err)
                }

            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
            return err.response
        }
    }

    const logout =  async (credentials) => {
        try {
            return await axios({
                url : `http://localhost:3030/management/jardin-api/v1/logout`,
                method : 'POST',
                headers : {
                    "Content-Type": "application/json"
                },
                auth : {
                    username : "LuisTerceroIII",
                    password : "5611858Morf"
                },
                data : credentials
            })
        } catch (err) {
            if(err.response) {
                console.log("Error: request could not be sent",err)
                console.log("Error, no se a podido conectar con el servidor",err)
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
            return null
        }
    }

    const getAllGarments = async () => {
        try {
            return await axios.get("http://localhost:3030/management/jardin-api/v1/garment", {
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                }
            })
        } catch (err) {
            if(err.response) {
                console.log("Error: request could not be sent",err)
                console.log("Error, no se a podido conectar con el servidor",err)
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
            return null
        }
    }

    const getGarmentById = async (id) => {
        try {
            return await axios({
                url : `http://localhost:3030/management/jardin-api/v1/garment/${id}`,
                method : 'GET',
                headers : {
                    "Content-Type": "application/json"
                },
                auth : {
                    username : 'LuisTerceroIII',
                    password : "5611858Morf"
                },
                params : {
                    id : id || null
                }
            })
        } catch (err) {
            if(err.response) {
                const statusCode = err.response.status;
                switch (statusCode) {
                    case 404 :
                        console.log("Invalid ID",err)
                        console.log("ID invalido",err)
                        break;
                    default :
                        console.log("Error: request could not be sent",err)
                        console.log("Error, no se a podido conectar con el servidor",err)
                }
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }


             return err.response
        }
    }
    const getGarmentByQuery = async (queryGarment) => {
        try {
            return await axios({
                url: "http://localhost:3030/management/jardin-api/v1/garment/search",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                },
                params: {
                    gender: queryGarment.gender || "",
                    size: queryGarment.size || "",
                    type: queryGarment.type || "",
                    madeIn: queryGarment.madeIn || "",
                    mainMaterial : queryGarment.mainMaterial || "",
                    priceFrom : queryGarment.priceFrom || 0,
                    priceTo: queryGarment.priceTo || 0
                }
            });
        } catch (err) {
            if(err.response) {
                console.log("Error: request could not be sent",err)
                console.log("Error, no se a podido conectar con el servidor",err)
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
        }
    }

    const saveWithoutPictures = async (garment) => {
        try {
            return await axios({
                url: "http://localhost:3030/management/jardin-api/v1/garment/post",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                },
                data: garment
            })
        } catch (err) {
            console.log("Error: request could not be sent",err)
            console.log("Error, no se a podido conectar con el servidor",err)
        }
    }

    const patchGarmentById = async (garmentToUpdate) => {
        const {id} = garmentToUpdate
        try {
            return await axios({
                url: `http://localhost:3030/management/jardin-api/v1/garment/${id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                },
                data: {
                    gender: garmentToUpdate.gender || null,
                    size: garmentToUpdate.size || null,
                    type: garmentToUpdate.type || null,
                    madeIn: garmentToUpdate.madeIn || null,
                    mainMaterial : garmentToUpdate.mainMaterial || null,
                    price : garmentToUpdate.price || null,
                    comment : garmentToUpdate.comment || null
                }
            });
        } catch (err) {
            if(err.response) {
                const statusCode = err.response.status;
                switch (statusCode) {
                    case 404 :
                        console.log("Invalid ID",err)
                        console.log("ID invalido",err)
                        break;
                    default :
                        console.log("Error: request could not be sent",err)
                        console.log("Error, no se a podido conectar con el servidor",err)
                }
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
        }
    }

    const deleteGarmentById = async (id) => {
        try {
            return await axios({
                url: `http://localhost:3030/management/jardin-api/v1/garment/delete/${id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                }
            })
        } catch (err) {
            if(err.response) {
                const statusCode = err.response.status;
                switch (statusCode) {
                    case 404 :
                        console.log("Invalid ID",err)
                        console.log("ID invalido",err)
                        break;
                    default :
                        console.log("Error: request could not be sent",err)
                        console.log("Error, no se a podido conectar con el servidor",err)
                }
            } else {
                console.log("Error: request could not be sent")
                console.log("Error, no se a podido conectar con el servidor")
            }
        }
    }

    return ({
        processLogin: processLogin,
        logout : logout,
        getAll: getAllGarments,
        getGarmentById : getGarmentById,
        getGarmentByQuery : getGarmentByQuery,
        saveWithoutPictures : saveWithoutPictures,
        patchGarmentById: patchGarmentById,
        deleteGarmentById :deleteGarmentById
    })
}