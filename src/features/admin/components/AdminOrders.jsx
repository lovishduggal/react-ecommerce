import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE, discountPrice } from '../../../app/constants';
import {
    EyeIcon,
    PencilIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
    fecthAllOrdersAsync,
    selectOrders,
    selectTotalOrders,
    updateOrderAsync,
} from '../../order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';

function AdminOrders() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);

    const handleShow = (order) => {
        console.log(order);
    };
    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    };
    const handlePage = (e, page) => {
        setPage(page);
    };
    const handleSort = (e, option) => {
        const sort = {
            _sort: option.sort,
            _order: option.order,
        };
        setSort(sort);
    };
    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fecthAllOrdersAsync({ pagination, sort }));
        //! TODO: Server will filter deleted products
    }, [dispatch, page, sort]);
    return (
        <>
            {console.log(totalOrders)}
            {orders && (
                <>
                    <div className="overflow-x-auto">
                        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                            <div className="w-full overflow-x-auto">
                                <div className="bg-white shadow-md rounded my-6">
                                    <table className="min-w-max w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                <th
                                                    className="py-3 px-6 text-left cursor-pointer"
                                                    onClick={(e) =>
                                                        handleSort(e, {
                                                            sort: 'id',
                                                            order:
                                                                sort._order ===
                                                                'desc'
                                                                    ? 'asc'
                                                                    : 'desc',
                                                        })
                                                    }>
                                                    Order#{' '}
                                                    {sort._sort === 'id' &&
                                                    sort._order === 'desc' ? (
                                                        <ArrowDownIcon className="w-4 h-4 inline-block" />
                                                    ) : (
                                                        <ArrowUpIcon className="w-4 h-4 inline-block" />
                                                    )}
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Items
                                                </th>
                                                <th
                                                    className="py-3 px-6 text-left cursor-pointer"
                                                    onClick={(e) =>
                                                        handleSort(e, {
                                                            sort: 'totalAmount',
                                                            order:
                                                                sort._order ===
                                                                'desc'
                                                                    ? 'asc'
                                                                    : 'desc',
                                                        })
                                                    }>
                                                    Total Amount{' '}
                                                    {sort._sort ===
                                                        'totalAmount' &&
                                                    sort._order === 'desc' ? (
                                                        <ArrowDownIcon className="w-4 h-4 inline-block" />
                                                    ) : (
                                                        <ArrowUpIcon className="w-4 h-4 inline-block" />
                                                    )}
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Shipping Address
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Status
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {orders &&
                                                orders?.map((order) => (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2"></div>
                                                                <span className="font-medium">
                                                                    {order.id}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {order.items.map(
                                                                (item) => (
                                                                    <div className="flex items-center">
                                                                        <div className="mr-2">
                                                                            <img
                                                                                className="w-6 h-6 rounded-full"
                                                                                src={
                                                                                    item.thumbnail
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <span>
                                                                            {
                                                                                item.title
                                                                            }{' '}
                                                                            - #
                                                                            {
                                                                                item.quantity
                                                                            }{' '}
                                                                            - $
                                                                            {discountPrice(
                                                                                item
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex  items-center justify-center">
                                                                $
                                                                {
                                                                    order.totalAmount
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex flex-col items-center justify-center">
                                                                <strong>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.name
                                                                    }
                                                                    ,
                                                                </strong>
                                                                <div>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.street
                                                                    }
                                                                    ,
                                                                </div>
                                                                <div>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.city
                                                                    }
                                                                    ,
                                                                </div>
                                                                <div>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.state
                                                                    }
                                                                    ,
                                                                </div>
                                                                <div>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.pinCode
                                                                    }
                                                                    ,
                                                                </div>
                                                                <div>
                                                                    {
                                                                        order
                                                                            ?.selectedAddress
                                                                            ?.phone
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {order.id ===
                                                            editableOrderId ? (
                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleUpdate(
                                                                            e,
                                                                            order
                                                                        )
                                                                    }>
                                                                    <option>
                                                                        --Choose--
                                                                    </option>
                                                                    <option value="pending">
                                                                        Pending
                                                                    </option>
                                                                    <option value="dispatched">
                                                                        Dispatched
                                                                    </option>
                                                                    <option value="delivered">
                                                                        Delivered
                                                                    </option>
                                                                    <option value="cancelled">
                                                                        Cancelled
                                                                    </option>
                                                                </select>
                                                            ) : (
                                                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                                    {
                                                                        order.status
                                                                    }
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex item-center justify-center">
                                                                <div
                                                                    className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleShow(
                                                                            order
                                                                        )
                                                                    }>
                                                                    <EyeIcon></EyeIcon>
                                                                </div>
                                                                <div
                                                                    className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer "
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleEdit(
                                                                            order
                                                                        )
                                                                    }>
                                                                    <PencilIcon></PencilIcon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        handlePage={handlePage}
                        totalItems={totalOrders}></Pagination>
                </>
            )}
        </>
    );
}

export default AdminOrders;
