import { useDispatch, useSelector } from 'react-redux';
import {
    clearSelectedProduct,
    createProductIdAsync,
    fetchProductByIdAsync,
    selectBrands,
    selectCategories,
    selectProductById,
    updateProductAsync,
} from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';

export default function ProductForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const { register, handleSubmit, setValue, reset } = useForm();
    const selectedProduct = useSelector(selectProductById);
    const [openModal, setOpenModal] = useState(null);
    const params = useParams();
    const sizes = [
        { name: 'XXS', inStock: true, id: 'xxs' },
        { name: 'XS', inStock: true, id: 'xs' },
        { name: 'S', inStock: true, id: 's' },
        { name: 'M', inStock: true, id: 'm' },
        { name: 'L', inStock: true, id: 'l' },
        { name: 'XL', inStock: true, id: 'xl' },
        { name: '2XL', inStock: true, id: '2l' },
        { name: '3XL', inStock: true, id: '3xl' },
    ];
    const colors = [
        { name: 'White', selectedClass: 'bg-white-400', id: 'white' },
        { name: 'Gray', selectedClass: 'bg-gray-400', id: 'gray' },
        { name: 'Black', selectedClass: 'bg-black', id: 'black' },
        { name: 'Red', selectedClass: 'bg-red-900', id: 'red' },
    ];
    const handleDelete = (e) => {
        const product = { ...selectedProduct };
        product.id = params.id;
        product.deleted = true;
        dispatch(updateProductAsync(product));
    };
    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductByIdAsync(params.id));
        } else dispatch(clearSelectedProduct());
    }, [params.id, dispatch]);

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('price', selectedProduct.price);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('stock', selectedProduct.stock);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
            setValue('image4', selectedProduct.images[3]);
            setValue('brand', selectedProduct.brand);
            setValue('category', selectedProduct.category);
            setValue(
                'colors',
                selectedProduct.colors.map((color) => color.id)
            );
            setValue(
                'sizes',
                selectedProduct.sizes.map((size) => size.id)
            );
            setValue('highlight1', selectedProduct.highlights[0]);
            setValue('highlight2', selectedProduct.highlights[1]);
            setValue('highlight3', selectedProduct.highlights[2]);
            setValue('highlight4', selectedProduct.highlights[3]);
        }
    }, [selectedProduct, setValue, params.id]);
    return (
        <form
            noValidate
            onSubmit={handleSubmit((data) => {
                const product = { ...data };
                product.images = [
                    product.image1,
                    product.image2,
                    product.image3,
                    product.image4,
                ];
                product.highlights = [
                    product.highlight1,
                    product.highlight2,
                    product.highlight3,
                    product.highlight4,
                ];

                product.colors = product?.colors
                    ? product?.colors?.map((color) =>
                          colors.find((clr) => clr.id === color)
                      )
                    : [];

                product.sizes = product?.sizes
                    ? product?.sizes?.map((size) =>
                          sizes.find((sz) => sz.id === size)
                      )
                    : [];
                console.log(product);
                delete product['image1'];
                delete product['image2'];
                delete product['image3'];
                delete product['image4'];
                product.price = +product.price;
                product.stock = +product.stock;
                product.discountPercentage = +product.discountPercentage;
                if (params.id) {
                    product.id = params.id;
                    product.rating = selectedProduct.rating || 0;
                    dispatch(updateProductAsync(product));
                } else dispatch(createProductIdAsync(product));
                reset();
            })}>
            <div className="space-y-12 bg-white p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Add Product
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Prodcut Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('title', {
                                            required: 'Name is required',
                                        })}
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {...register('description', {
                                        required: 'Description is required',
                                    })}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about Product.
                            </p>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="brand"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('brand', {
                                        required: 'Brand is required',
                                    })}
                                    className="block flex-1 border-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                    <option>Choose</option>
                                    {brands.map((brand) => (
                                        <option value={brand.value}>
                                            {brand.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="colors"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Colors
                            </label>
                            <div className="mt-2">
                                {colors.map((color, index) => (
                                    <div
                                        key={color.id}
                                        className="flex items-center">
                                        <input
                                            className="mx-2"
                                            {...register('colors')}
                                            type="checkbox"
                                            value={color.id}></input>{' '}
                                        <span> {color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="sizes"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Sizes
                            </label>
                            <div className="mt-2 flex items-center">
                                {sizes.map((size, index) => (
                                    <div
                                        key={size.id}
                                        className="flex items-center">
                                        <input
                                            className="mx-2"
                                            {...register('sizes')}
                                            type="checkbox"
                                            value={size.id}></input>{' '}
                                        <span>{size.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register('category', {
                                        required: 'Category is required',
                                    })}
                                    className="block flex-1 border-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                    <option>Choose</option>
                                    {categories.map((category, idx) => (
                                        <option
                                            value={category.value}
                                            key={idx}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: 1,
                                            max: 10000,
                                        })}
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="discountPercentage"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Discount
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('discountPercentage', {
                                            required:
                                                'Discount Percentage is required',
                                            min: 0,
                                            max: 100,
                                        })}
                                        id="discountPercentage"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="stock"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="number"
                                        {...register('stock', {
                                            required: 'Stock is required',
                                            min: 0,
                                        })}
                                        id="stock"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label
                                htmlFor="thumbnail"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail{' '}
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('thumbnail', {
                                            required: 'Thumbnail is required',
                                        })}
                                        id="thumbnail"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image1"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Image 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image1', {
                                            required: 'Image 1 is required',
                                        })}
                                        id="image1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image2"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Image 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image2', {
                                            required: 'Image 2 is required',
                                        })}
                                        id="image2"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image3"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Image 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image3', {
                                            required: 'Image 3 is required',
                                        })}
                                        id="image3"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="image4"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Image 4
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('image4', {
                                            required: 'Image 4 is required',
                                        })}
                                        id="image4"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="highlight1"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Highlight 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('highlight1')}
                                        id="highlight1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="highlight2"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Highlight 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('highlight2')}
                                        id="highlight2"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="highlight3"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Highlight 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('highlight3')}
                                        id="highlight3"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="highlight4"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Highlight 4
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                    <input
                                        type="text"
                                        {...register('highlight4')}
                                        id="highlight4"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Extra
                    </h2>
                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                By Email
                            </legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="comments"
                                            className="font-medium text-gray-900">
                                            Comments
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when someones posts a
                                            comment on a posting.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="candidates"
                                            className="font-medium text-gray-900">
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when a candidate
                                            applies for a job.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label
                                            htmlFor="offers"
                                            className="font-medium text-gray-900">
                                            Offers
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when a candidate
                                            accepts or rejects an offer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>

                {selectedProduct && !selectedProduct.deleted && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(true);
                        }}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Delete
                    </button>
                )}

                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </button>
            </div>
            <Modal
                title={`Delete ${selectedProduct?.title}`}
                message={'Are you sure you want to delete this Product?'}
                dangerOption={'Delete'}
                cancelOption={'Cancel'}
                dangerAction={handleDelete}
                showModal={openModal}
                setOpenModal={setOpenModal}></Modal>
        </form>
    );
}
