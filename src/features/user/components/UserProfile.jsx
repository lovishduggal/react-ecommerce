import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
//! We will add payment section when we work on backend
export default function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);

    const handleEdit = (updateAddress, index) => {
        const newUser = { ...user, addresses: [...user.addresses] };
        newUser.addresses.splice(index, 1, updateAddress);
        dispatch(updateUserAsync(newUser));
    };

    const handleRemove = (e, index) => {
        const newUser = { ...user, addresses: [...user.addresses] };
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));
    };

    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        const address = user.addresses[index];
        setValue('name', address.name);
        setValue('email', address.email);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('pinCode', address.pinCode);
        setValue('phone', address.phone);
        setValue('street', address.street);
    };

    const handleAdd = (address) => {
        const newUser = { ...user, addresses: [...user.addresses, address] };
        dispatch(updateUserAsync(newUser));
    };

    return (
        <div>
            {user && (
                <div>
                    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 text-center sm:text-start">
                            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                                Name: {user.email.split('@')[0]}
                            </h1>
                            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                Email Address: {user?.email}
                            </h3>
                            {user.role === 'admin' && (
                                <h4 className="text-xl my-5 font-bold tracking-tight text-red-900">
                                    Role: {user?.role}
                                </h4>
                            )}
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 relative">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    setShowAddAddressForm(!showAddAddressForm);
                                    setSelectedEditIndex(-1);
                                }}
                                className=" absolute rounded-md  bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 top-1 right-6">
                                Add New Address
                            </button>
                            {showAddAddressForm ? (
                                <form
                                    noValidate
                                    className="bg-white px-5 mt-2 py-4"
                                    onSubmit={handleSubmit((data, index) => {
                                        handleAdd(data);
                                        reset();
                                    })}>
                                    <div className="space-y-12 ">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                'name',
                                                                {
                                                                    required:
                                                                        'name is required',
                                                                }
                                                            )}
                                                            id="name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register(
                                                                'email',
                                                                {
                                                                    required:
                                                                        'email is required',
                                                                }
                                                            )}
                                                            type="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Phone
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            type="tel"
                                                            {...register(
                                                                'phone',
                                                                {
                                                                    required:
                                                                        'phone is required',
                                                                }
                                                            )}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label
                                                        htmlFor="street"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                'street',
                                                                {
                                                                    required:
                                                                        'street is required',
                                                                }
                                                            )}
                                                            id="street"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label
                                                        htmlFor="city"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                'city',
                                                                {
                                                                    required:
                                                                        'city is required',
                                                                }
                                                            )}
                                                            id="city"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="state"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                'state',
                                                                {
                                                                    required:
                                                                        'state is required',
                                                                }
                                                            )}
                                                            id="state"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="pinCode"
                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register(
                                                                'pinCode',
                                                                {
                                                                    required:
                                                                        'name is required',
                                                                }
                                                            )}
                                                            id="pinCode"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Add Address
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : null}
                            <p className="mt-4 text-sm text-gray-500 text-center sm:text-start ">
                                Your Address:
                            </p>
                            <div className="space-y-1">
                                {user &&
                                    user?.addresses?.map((address, index) => (
                                        <div key={address.email}>
                                            {selectedEditIndex === index ? (
                                                <form
                                                    noValidate
                                                    className="bg-white px-5 mt-2 py-4"
                                                    onSubmit={handleSubmit(
                                                        (data, index) => {
                                                            handleEdit(
                                                                data,
                                                                index
                                                            );
                                                            reset();
                                                        }
                                                    )}>
                                                    <div className="space-y-12 ">
                                                        <div className="border-b border-gray-900/10 pb-12">
                                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                <div className="sm:col-span-4">
                                                                    <label
                                                                        htmlFor="name"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Full
                                                                        Name
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            type="text"
                                                                            {...register(
                                                                                'name',
                                                                                {
                                                                                    required:
                                                                                        'name is required',
                                                                                }
                                                                            )}
                                                                            id="name"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="sm:col-span-4">
                                                                    <label
                                                                        htmlFor="email"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Email
                                                                        address
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            id="email"
                                                                            {...register(
                                                                                'email',
                                                                                {
                                                                                    required:
                                                                                        'email is required',
                                                                                }
                                                                            )}
                                                                            type="email"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="sm:col-span-4">
                                                                    <label
                                                                        htmlFor="phone"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Phone
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            id="phone"
                                                                            type="tel"
                                                                            {...register(
                                                                                'phone',
                                                                                {
                                                                                    required:
                                                                                        'phone is required',
                                                                                }
                                                                            )}
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-full">
                                                                    <label
                                                                        htmlFor="street"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        Street
                                                                        address
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            type="text"
                                                                            {...register(
                                                                                'street',
                                                                                {
                                                                                    required:
                                                                                        'street is required',
                                                                                }
                                                                            )}
                                                                            id="street"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="sm:col-span-2 sm:col-start-1">
                                                                    <label
                                                                        htmlFor="city"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        City
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            type="text"
                                                                            {...register(
                                                                                'city',
                                                                                {
                                                                                    required:
                                                                                        'city is required',
                                                                                }
                                                                            )}
                                                                            id="city"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="sm:col-span-2">
                                                                    <label
                                                                        htmlFor="state"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        State /
                                                                        Province
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            type="text"
                                                                            {...register(
                                                                                'state',
                                                                                {
                                                                                    required:
                                                                                        'state is required',
                                                                                }
                                                                            )}
                                                                            id="state"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="sm:col-span-2">
                                                                    <label
                                                                        htmlFor="pinCode"
                                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                                        ZIP /
                                                                        Postal
                                                                        code
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input
                                                                            type="text"
                                                                            {...register(
                                                                                'pinCode',
                                                                                {
                                                                                    required:
                                                                                        'name is required',
                                                                                }
                                                                            )}
                                                                            id="pinCode"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setSelectedEditIndex(
                                                                        -1
                                                                    );
                                                                }}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                                Edit Address
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            ) : null}
                                            <div className="flex justify-between flex-col sm:flex-row gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 space-y-4">
                                                <div className="flex gap-x-4">
                                                    <div className="min-w-0 flex-auto text-center sm:text-start">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {address?.name}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address?.street}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address?.pinCode}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className=" sm:flex sm:flex-col sm:items-end text-center sm:text-start">
                                                    <p className="text-sm  leading-6 text-gray-900">
                                                        Phone: {address?.phone}
                                                    </p>
                                                    <p className="text-sm leading-6 text-gray-500">
                                                        {address?.city}
                                                    </p>
                                                </div>
                                                <div className="sm:flex sm:flex-col sm:items-end text-center sm:text-start">
                                                    <button
                                                        onClick={(e) => {
                                                            handleEditForm(
                                                                index
                                                            );
                                                            setShowAddAddressForm(
                                                                false
                                                            );
                                                        }}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(e) =>
                                                            handleRemove(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
