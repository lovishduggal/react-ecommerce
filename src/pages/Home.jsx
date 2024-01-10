import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/product/components/ProductList';
import Footer from '../features/common/Footer';
import { Grid } from 'react-loader-spinner';
import { selectUserChecked } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../features/user/userSlice';

function Home() {
    const userInfo = useSelector(selectUserInfo);
    return (
        <div>
            <NavBar>
                {' '}
                <ProductList></ProductList>
            </NavBar>
            {userInfo ? <Footer></Footer> : null}
        </div>
    );
}

export default Home;
