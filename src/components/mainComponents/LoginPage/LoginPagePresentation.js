import React from "react";
import './LoginPagePresentation.css';
import { useForm } from "react-hook-form";

export const LoginPagePresentation = (props) => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        props.setCredentials({
            username: data.username,
            password: data.password
        })
    };

    return (
            <div className={'welcomePage-main-container'}>

                <div className={'logo-container'}>
                    <h1 className={'welcomePage-title'}>JARDÍN STOCK</h1>
                    <div className={'break-line'}>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                   <div className={'username-input-container'}>
                       <label id={'username'}>Username</label>
                       <input name={'username'} ref={register}/>
                       {errors.username && <span className={'password-required-error'}>The username is required</span>}
                   </div>

                    <div className={'password-input-container'}>
                        <label id={'password'}>Password</label>
                        <input type={'password'} name={'password'} ref={register({
                            required: true,
                            minLength: 2
                        })}/>
                        {errors.password && <span className={'password-required-error'}>The password is required</span>}
                    </div>

                    <button type={"submit"}>Send</button>
                </form>

            </div>



    )
}
