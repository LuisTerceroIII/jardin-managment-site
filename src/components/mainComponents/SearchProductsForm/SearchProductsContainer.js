import React, {useEffect} from 'react'
import {SearchProductsPresentation} from "./SearchProductsPresentation";
import {useHistory} from 'react-router-dom'
import {JardinApiService} from "../../../services/JardinApiService";
import {utils} from "../../../utilFunctions/utils";

/*
    Recibe la variable de estado: "query" y "setQuery" y las Pasa a SearchProductsPresentation
    SearchProductsPresentation : Setea query con el valor del formulario.
    SearchProductsContainer : Useeffects escucha a query, cuando se actualiza con los valores del formulario
    hace la redirecion al compoenete que muestra los resultados con history.psuh("/results")
 */

//TODO: Recibir parametros de los selects en el formulario desde la API. De ese modo mostrar solo opciones posibles y validas.
export const SearchProductsContainer = (props) => {

    // Form variables values  ------------------------------------------------------
    const types = ["","Bufanda","Camisa","Campera","Chaqueta","Gorro","Herb","Pantalon","Remera","Zapato"]
    const sizes = ["","1g","30","33","36","44","5","55cm","L","s","XL","M","S"]
    const genders = ["",'Unisex','Mujer', 'Hombre'];
    //const madeIn = ["","Afghanistan","Argentina","Argetina","Chile","China","Italia","United States","USA","Italy"]
    const materials = ['','Algodón', 'Lino', 'Poliéster', 'Viscosa', 'Lana', 'Ramio', 'Cáñamo', 'Seda', 'Nylon', 'Lycra',"Ceda","Corderoi","Jean","lana","Sintetico"];
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
        'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',"Italia","Argetina"];

    const title = 'JARDÍN';
    // --------------- end form values vars ----------------------------------------------------------

    //history es una variable de React-router-dom
    //Pareciera una pila, puedes ir atras y adelante con funcinoes de history
    //Aca uso histoy para ir a otro componente (ruta) con el metodo push()
    // history.push("/rutaAIr")
    const history = useHistory()

    // Dado que la variable de estado que fijamos para renderizar este componente es query
    // y cuando la respuesta se renderiza en "ResultOfSearch" se setea un objeto vacio.
    // Es necesario recordar que en la funcion useEffect(), si el objeto query no esta vacio,
    // se va hacia el path "/results" es decir al component "ResultOfSearchContainer"

    //Escucha los cambios en "props.query", si "props.query" no esta vacio, redireciona a mostrar los resultados de la busqueda.
    useEffect(() => {
        //console.log('Query ===',props.query.query) --> Esta en la query con la que se trabaja. Por defecto se setea un obtejo vacio {}.
        const queryResult = JardinApiService().getGarmentByQuery(props.query.query)
        queryResult.then(garments => {
            if(garments){
                let response = garments.data || ""
                props.setQueryResponse(garments.data)
                if(response.length >= 0 && !utils().isEmpty(props.query.query) ) {
                    history.push('/search/results')
                }
            }
        })
    }, [props.query])

    return (
       <SearchProductsPresentation title={title}
                                   types={types}
                                   sizes={sizes}
                                   genders={genders}
                                   materials={materials}
                                   madeIn={madeIn}
                                   setQuery={props.setQuery}

       />
    )
}