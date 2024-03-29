/* eslint-disable react/prop-types */
import {useContext} from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import {Navigate} from 'react-router-dom';

function IsUser({children}) {

    const {isLoggedIn, isLoading} = useContext(AuthContext);
    if (isLoading) return <p>Loading ... </p>; 
    
    if (!isLoggedIn){
        return <Navigate to="/login" />
    } 
    else { 
        return children; 
    }
}

export default IsUser;