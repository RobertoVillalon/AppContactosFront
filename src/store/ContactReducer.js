import axios from 'axios';

//Informacion Inicial
const dataInicial = {
    contacts: null,
    searchcontact: null
}

//Constantes
const GET_CONTACT_DATA = "GET_CONTACT_DATA";
const INSERT_CONTACT_DATA = "INSERT_CONTACT_DATA"
const SEARCH_CONTACT_DATA = "SEARCH_CONTACT_DATA";

//reducers
export default function contactReducer(state = dataInicial, action){

    switch (action.type) {
        case GET_CONTACT_DATA:
            return {...state, contacts: action.payload}
        case INSERT_CONTACT_DATA:
            return state;
        case SEARCH_CONTACT_DATA:
            return {...state, searchcontact: action.payload}
        default: 
            return state
    }
}

//Acciones

export const searchContactAction = (texto) => async (dispatch, getState) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/search:${texto}`)
        dispatch({
            type: SEARCH_CONTACT_DATA,
            payload: res.data
        })
    }catch(error){
        console.log(error);
    }  
}

export const getContactAction = (id) => async (dispatch, getState) => {
    try{
        const res = await axios.get(`http://localhost:8080/api/${id}/contactos`)
            dispatch({
                type: GET_CONTACT_DATA,
                payload: res.data
            })
    }catch(error){
        console.log(error);
    }
}

export const insertContactAction = (idContact, myID) => (dispatch, getState) => {
    try{
        const res = axios.post(`http://localhost:8080/api/${myID}/agregarContacto`, idContact)
        dispatch({
            type: GET_CONTACT_DATA,
            payload: res
        })
    }catch(error){
        console.log(error);
    }
}