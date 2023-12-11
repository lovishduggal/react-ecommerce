import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
import SignupPage from '../../../pages/SignupPage';

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(signOutAsync(user));
    }, [user, dispatch]);
    return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
