import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAsync, selectPasswordReset } from '../authSlice';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
    const dispatch = useDispatch();
    const query = useQuery();
    const token = query.get('token');
    const email = query.get('email');
    const passwordReset = useSelector(selectPasswordReset);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <>
            {token && email ? (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-40 w-40"
                            src="/ec-logo.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Enter your New Password
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            noValidate
                            className="space-y-6"
                            onSubmit={handleSubmit((data) => {
                                dispatch(
                                    resetPasswordAsync({
                                        password: data.password,
                                        email,
                                        token,
                                    })
                                );
                            })}>
                            <div>
                                <div className="mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        New Password
                                    </label>
                                    <input
                                        id="password"
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message:
                                                    'At least 8 character must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special characters',
                                            },
                                        })}
                                        type="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">
                                            {errors.password.message}
                                        </span>
                                    )}
                                    {passwordReset && (
                                        <span className="text-green-500">
                                            The Password has reset.
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            {...register('confirmPassword', {
                                                required:
                                                    'confirm password is required',
                                                validate: (value, formValues) =>
                                                    value ===
                                                        formValues.password ||
                                                    'password not matched',
                                            })}
                                            type="password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.confirmPassword && (
                                            <span className="text-red-500">
                                                {errors.confirmPassword.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <p>Incorrect link</p>
            )}
        </>
    );
}
