import { useSelector } from 'react-redux';
import { selectLoggedInUser, selectUserChecked } from '../authSlice';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
    const user = useSelector(selectLoggedInUser);
    console.log(user);
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    return children;
}

export default Protected;
