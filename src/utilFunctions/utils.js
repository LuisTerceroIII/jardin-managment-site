

export const utils = () => {
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0; // El metodo Object.keys(obj) retorna un array con las propiedades del objeto.
    }

    return {
        isEmpty : isEmpty
    }
}