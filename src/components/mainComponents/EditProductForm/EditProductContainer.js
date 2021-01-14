import React,{useState, useEffect} from 'react';
import {EditProductPresentation} from "./EditProductPresentation";
import {useHistory} from "react-router-dom";
import {JardinApiService} from "../../../services/JardinApiService";

export const EditProductContainer = (props) => {
    // Form variables values  ------------------------------------------------------
    const genders = ['','Mujer', 'Hombre', 'Unisex'];
    const materials = ['','Algodón', 'Lino', 'Poliéster', 'Viscosa', 'Lana', 'Ramio', 'Cáñamo', 'Seda', 'Nylon', 'Lycra'];
    const madeIn = ['','Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda',
        'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
        'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
        'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
        'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic',
        'Congo, Republic of the', 'Costa Rica', 'Cote d', 'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
        'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
        'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
        'Greece', 'Greenland', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong',
        'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
        'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
        'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar',
        'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
        'Moldova', 'Mongolia', 'Morocco', 'Monaco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
        'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
        'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', ' Sao Tome',
        'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
        'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden',
        'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago',
        'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
        'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];

    const title = 'JARDÍN';
    // --------------- end form values vars ----------------------------------------------------------

    //history es una variable de React-router-dom
    //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
    //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
    // history.push("/rutaAIr")
    const history = useHistory()

    const [garmentToUpdate,setGarmentToUpdate] = useState({
        id : "",
        type : "",
        size : "",
        mainColor : "",
        gender: "",
        mainMaterial : "",
        madeIn : "",
        price : "",
        comment : ""
    })

    const [garmentToUpdateId,setGarmentToUpdateId] = useState("")

    const [searchGarment,setSearchGarment] = useState(false)
    const [patchGarment,setPatchGarment] = useState(false)

    const [idNotFound,setIDNotFound] = useState(true)


    useEffect(() => {

        if(searchGarment === true) {
            console.log("Dentro de searchGarment", "Garment id : " , garmentToUpdateId)
            const response = JardinApiService().getGarmentById(garmentToUpdateId)
            response.then(garment => {
                if(garment.status === 404) {
                    setIDNotFound(false)
                    setGarmentToUpdate({id : "",type : "",size : "",mainColor : "",gender: "",mainMaterial : "",madeIn : "",price : "",comment : ""})
                }
                if(garment.status === 500) {
                    console.log("Error interno del servidor")
                    setIDNotFound(false)
                    setGarmentToUpdate({id : "",type : "",size : "",mainColor : "",gender: "",mainMaterial : "",madeIn : "",price : "",comment : ""})
                }
                if(garment.status === 202) {
                    setIDNotFound(true)
                    setGarmentToUpdate(garment.data)
                }
            })
            setSearchGarment(false)
        }
        if(patchGarment === true) {
            setPatchGarment(false)
            const response = JardinApiService().patchGarmentById(props.editRequest)
            response.then(res => {
                props.setEditResponse(res.data)
                history.push("/edit/result")
            }).catch(err => console.log("ENTRE AL ERROR ;(",err))
        }



    },[props.editRequest,searchGarment])

    return(
        <EditProductPresentation title={title}
                                 genders={genders}
                                 materials={materials}
                                 madeIn={madeIn}
                                 garmentToUpdate={garmentToUpdate}
                                 setGarmentToUpdate={setGarmentToUpdate}
                                 setGarmentToUpdateId={setGarmentToUpdateId}
                                 garmentToUpdateId={garmentToUpdateId}
                                 setSearchGarment={setSearchGarment}
                                 setPatchGarment={setPatchGarment}
                                 setEditRequest={props.setEditRequest}
                                 idNotFound={idNotFound}
        />
    )
}