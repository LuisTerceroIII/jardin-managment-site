import React from 'react';
import './CreateProductFormPresentation.css'
import InputColor from 'react-input-color';
import { useForm } from "react-hook-form";


export const CreateProductFormPresentation = (props) => {

    const [color, setColor] = React.useState({});
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const garment = {
            comment: data.comment,
            gender: data.gender,
            madeIn: data.madeIn,
            mainMaterial: data.mainMaterial,
            mainColor: color.hex,
            price: data.price,
            size: data.size,
            type: data.type
        }

        props.setCreateRequest({
            newGarment : garment
        })
    };
    const onChangeColor = (e) => {
        setColor(e)
    }
    const genders = props.genders.map((gender, index) => {
        return (
            <option key={index}>{gender}</option>
        )
    })
    const materials = props.materials.map((material,index) => {
        return(
            <option key={index}>{material}</option>
        );
    });
    const madeIn = props.madeIn.map((country,index) => {
        return(
            <option key={index}>{country}</option>
        );
    });

    return (
        <div className={'form-presentation-main-container'}>
            <h1 className={'form-presentation-title'}>{props.title}</h1>
            <form className={'form-presentation-form-container'} onSubmit={handleSubmit(onSubmit)}>

                <label className={'form-presentation-label'}>Tipo de prenda</label>
                <input name="type" className={'form-presentation-input'}
                       ref={register({
                           required : true
                       })}
                />
                {errors.type && <span>Tipo requerido</span>}

                <label className={'form-presentation-label'}>Talle</label>
                <input className={'form-presentation-input'}
                       name={"size"}
                       ref={register({
                           required : true
                       })}
                />
                <label className={'form-presentation-label'}>Genero</label>
                <select className={'form-presentation-input'}
                        name={"gender"}
                        ref={register({
                            required : true
                        })}
                >
                    {genders}
                </select>

                <label className={'form-presentation-label'}>Material principal</label>
                <select className={'form-presentation-input'}
                        name="mainMaterial"
                        ref={register({
                            required : true
                        })}
                >
                    {materials}
                </select>

                <label className={'form-presentation-label'}>Origen</label>
                <select className={'form-presentation-input'}
                        name={"madeIn"}
                        ref={register({
                            required : true
                        })}
                >
                    {madeIn}
                </select>


                <label className={'form-presentation-label'}>Precio</label>
                <input type={'number'}
                       className={'form-presentation-input'}
                       name={"price"}
                       ref={register({
                           required : true
                       })}
                />

               <label className={'form-presentation-label'}>Color Principal</label>
                <InputColor className={'form-presentation-input'}
                            initialValue="#cbdb37"
                            onChange={(e) => onChangeColor(e)}
                            placement="right"

                />
                <label className={'form-presentation-label'}>Imagenes</label>

                <label className={'form-presentation-label'}>Comentario</label>
                <textarea className={'form-presentation-textarea'}
                          name={"comment"}
                          ref={register({
                              required : true
                          })}
                          rows={2}
                />


                <input type={"submit"} value={"Crear"} className={'form-presentation-crate-button form-presentation-button'}/>

            </form>
        </div>
    )
}