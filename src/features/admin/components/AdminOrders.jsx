import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../app/constants';
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
import { Grid } from 'react-loader-spinner';

function AdminOrders() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);

    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };
    const handleOrderStatus = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    };
    const handleOrderPaymentStatus = (e, order) => {
        const updatedOrder = { ...order, paymentStatus: e.target.value };
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
    }, [dispatch, page, sort]);
    return (
        <>
            {orders && orders.length > 0 ? (
                <>
                    <div className="overflow-x-hidden">
                        <div className="flex items-center justify-center bg-gray-100 font-sans ">
                            <div className="w-full bg-white overflow-x-auto">
                                <div className="rounded my-6">
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
                                                    Order Status
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Payment
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Payment Status
                                                </th>
                                                <th
                                                    className="py-3 px-6 text-center cursor-pointer"
                                                    onClick={(e) =>
                                                        handleSort(e, {
                                                            sort: 'createdAt',
                                                            order:
                                                                sort._order ===
                                                                'desc'
                                                                    ? 'asc'
                                                                    : 'desc',
                                                        })
                                                    }>
                                                    Order Time{' '}
                                                    {sort._sort ===
                                                        'createdAt' &&
                                                    sort._order === 'desc' ? (
                                                        <ArrowDownIcon className="w-4 h-4 inline-block" />
                                                    ) : (
                                                        <ArrowUpIcon className="w-4 h-4 inline-block" />
                                                    )}
                                                </th>
                                                <th
                                                    className="py-3 px-6 text-center cursor-pointer"
                                                    onClick={(e) =>
                                                        handleSort(e, {
                                                            sort: 'updatedAt',
                                                            order:
                                                                sort._order ===
                                                                'desc'
                                                                    ? 'asc'
                                                                    : 'desc',
                                                        })
                                                    }>
                                                    Last Updated{' '}
                                                    {sort._sort ===
                                                        'updatedAt' &&
                                                    sort._order === 'desc' ? (
                                                        <ArrowDownIcon className="w-4 h-4 inline-block" />
                                                    ) : (
                                                        <ArrowUpIcon className="w-4 h-4 inline-block" />
                                                    )}
                                                </th>

                                                <th className="py-3 px-6 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {orders &&
                                                orders?.map((order) => (
                                                    <tr
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                        key={order.id}>
                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2"></div>
                                                                <span className="font-medium">
                                                                    {order.id}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            <div className="flex flex-col items-start">
                                                                {order.items.map(
                                                                    (item) => (
                                                                        <div
                                                                            key={
                                                                                item
                                                                                    .product
                                                                                    .id
                                                                            }
                                                                            className="flex items-center mb-2">
                                                                            <div className="mr-2">
                                                                                <img
                                                                                    className="w-6 h-6 rounded-full"
                                                                                    src={
                                                                                        item
                                                                                            .product
                                                                                            .thumbnail
                                                                                    }
                                                                                    alt={
                                                                                        item
                                                                                            .product
                                                                                            .title
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <span>
                                                                                {
                                                                                    item
                                                                                        .product
                                                                                        .title
                                                                                }{' '}
                                                                                -
                                                                                #
                                                                                {
                                                                                    item.quantity
                                                                                }{' '}
                                                                                -
                                                                                $
                                                                                {
                                                                                    item
                                                                                        .product
                                                                                        .discountPrice
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex items-center justify-center">
                                                                $
                                                                {
                                                                    order.totalAmount
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex flex-col items-start">
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
                                                                        handleOrderStatus(
                                                                            e,
                                                                            order
                                                                        )
                                                                    }
                                                                    className="w-full p-2 rounded-md">
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
                                                            <div className="flex items-center justify-center font-medium">
                                                                {
                                                                    order.paymentMethod
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {order.id ===
                                                            editableOrderId ? (
                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleOrderPaymentStatus(
                                                                            e,
                                                                            order
                                                                        )
                                                                    }
                                                                    className="w-full p-2 rounded-md">
                                                                    <option>
                                                                        --Choose--
                                                                    </option>
                                                                    <option value="pending">
                                                                        Pending
                                                                    </option>
                                                                    <option value="Received">
                                                                        Received
                                                                    </option>
                                                                </select>
                                                            ) : (
                                                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                                    {
                                                                        order.paymentStatus
                                                                    }
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2"></div>
                                                                <span className="font-medium">
                                                                    {new Date(
                                                                        order.createdAt
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="mr-2"></div>
                                                                <span className="font-medium">
                                                                    {new Date(
                                                                        order.updatedAt
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex item-center justify-center">
                                                                <div
                                                                    className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
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
            ) : (
                <div className="w-full h-[80vh] flex items-center justify-center">
                    <Grid
                        height="80"
                        width="80"
                        color="#1F2937"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )}
        </>
    );
}

export default AdminOrders;
