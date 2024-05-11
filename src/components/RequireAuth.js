import {Navigate} from "react-router-dom";
import {useAuthContext} from "./useAuth";

function RequireAuth(props) {
    const {isTokenValid, getRole} = useAuthContext();
    if (isTokenValid() && props.roles.includes(getRole())) {
        return props.children
    }
   return <Navigate to={props.loginUrl} replace/>;
}

export default RequireAuth;