import NavBar from '../features/navbar/NavBar';
import UserOrders from '../features/user/components/UserOrders';

function UserOrdersPage() {
    return (
        <div>
            <NavBar>
                <h1 className="text-3xl font-medium mx-4 mt-4">My Orders</h1>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;
