import { useSelector } from 'react-redux';
import Footer from '../features/common/Footer';
import NavBar from '../features/navbar/NavBar';
import ProductDetails from '../features/product/components/ProductDetails';
import { selectProductById } from '../features/product/productSlice';

function ProductDetailsPage() {
    const product = useSelector(selectProductById);
    return (
        <div>
            <NavBar>
                <ProductDetails></ProductDetails>
            </NavBar>
            {product ? <Footer></Footer> : null}
        </div>
    );
}

export default ProductDetailsPage;
