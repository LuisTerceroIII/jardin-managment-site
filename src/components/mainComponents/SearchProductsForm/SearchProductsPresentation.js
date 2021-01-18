import React from 'react'
import {useForm} from "react-hook-form";
import InputColor from "react-input-color";
import {formData} from "../../../componentData/formsData";


export const SearchProductsPresentation = (props) => {

    // Start forms variables ------------------------------------------
    const [color, setColor] = React.useState({});
    const onChangeColor = (e) => {
        setColor(e)
    }
    const types = formData.types.map((type,index) => {
        return (
            <option key={index}>{type}</option>
        )
    })
    const sizes = formData.sizes.map((size,index) => {
        return (
            <option key={index}>{size}</option>
        )
    })
    const genders = formData.genders.map((gender, index) => {
        return (
            <option key={index}>{gender}</option>
        )
    })
    const materials = formData.materials.map((material,index) => {
        return(
            <option key={index}>{material}</option>
        );
    });
    const madeIn = formData.madeIn.map((country,index) => {
        return(
            <option key={index}>{country}</option>
        );
    });

    const { register, handleSubmit } = useForm();
    // End form variables ---------------------------------------
    // Funcion que captura los datos del formulario.
    const onSubmit = data => {
        const garment = {
            // TODO: Evaluar si incluir "comment" como parametro de busqueda.
            comment: data.comment,
            gender: data.gender,
            madeIn: data.madeIn,
            mainMaterial: data.mainMaterial,
            // TODO: Resolver formato de color.
            mainColor: color.hex,
            priceFrom: data.priceFrom,
            priceTo: data.priceTo,
            size: data.size,
            type: data.type
        }
        let query = {
            query : garment
        }
        props.setQuery(query)
    };

    return (
        <div className={'form-presentation-main-container'}>
            <h1 className={'form-presentation-title'}>{formData.title}</h1>
            <form className={'form-presentation-form-container'} onSubmit={handleSubmit(onSubmit)}>

                <label className={'form-presentation-label'}>Tipo de prenda</label>
                <select name="type" className={'form-presentation-input'}
                       ref={register({
                           required : false
                       })}
                >
                    {types}
                </select>

                <label className={'form-presentation-label'}>Talle</label>
                <select className={'form-presentation-input'}
                       name={"size"}
                       ref={register({
                           required : false
                       })}
                >
                    {sizes}
                </select>

                <label className={'form-presentation-label'}>Genero</label>
                <select className={'form-presentation-input'}
                        name={"gender"}
                        ref={register({
                            required : false
                        })}
                >
                    {genders}
                </select>

                <label className={'form-presentation-label'}>Material principal</label>
                <select className={'form-presentation-input'}
                        name="mainMaterial"
                        ref={register({
                            required : false
                        })}
                >
                    {materials}
                </select>

                <label className={'form-presentation-label'}>Origen</label>
                <select className={'form-presentation-input'}
                        name={"madeIn"}
                        ref={register({
                            required : false
                        })}
                >
                    {madeIn}
                </select>

                <label className={'form-presentation-label'}>Precio</label>
                <label className={'form-presentation-label'}>Desde</label>
                <input type={'number'}
                       className={'form-presentation-input'}
                       name={"priceFrom"}
                       ref={register({
                           required : false
                       })}
                />

                <label className={'form-presentation-label'}>Hasta</label>
                <input type={'number'}
                       className={'form-presentation-input'}
                       name={"priceTo"}
                       ref={register({
                           required : false
                       })}
                />

                <label className={'form-presentation-label'}>Color Principal</label>
                <InputColor className={'form-presentation-input'}
                            initialValue="#cbdb37"
                            onChange={(e) => onChangeColor(e)}
                            placement="right"
                />
                <input type={"submit"} value={"Buscar"}
                       className={'form-presentation-crate-button form-presentation-button'}

                    />
            </form>
        </div>
    )
}