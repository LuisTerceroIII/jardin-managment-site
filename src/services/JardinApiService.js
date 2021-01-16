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
            console.log(err)
        }
    }

    const getAllGarments = async () => {
        try {
            const garments =  await axios.get("http://localhost:3030/management/jardin-api/v1/garment", {
                auth: {
                    username: "LuisTerceroIII",
                    password: "5611858Morf"
                }
            })
            return garments.data
        } catch (err) {
            console.log(err)
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
            console.log("Dentro de error")
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
            console.log(err)
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
            console.log(err)
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
            console.log(err)
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
            console.log("Error, no se apodido conectar con el servidor",err)
        }
    }

    return ({
        processLogin: processLogin,
        getAll: getAllGarments,
        getGarmentById : getGarmentById,
        getGarmentByQuery : getGarmentByQuery,
        saveWithoutPictures : saveWithoutPictures,
        patchGarmentById: patchGarmentById,
        deleteGarmentById :deleteGarmentById
    })
}