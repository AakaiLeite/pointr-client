/* eslint-disable react/prop-types */

import {useContext} from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import {Navigate} from 'react-router-dom';

function IsGuest({children}) {


    const {isLoggedIn, isLoading} = useContext(AuthContext);
    if (isLoading) return <p>Loading ... </p>; 
    
    if (isLoggedIn){
        return <Navigate to="/" />
    } 
    else {
        return children; 
    }
}

export default IsGuest;