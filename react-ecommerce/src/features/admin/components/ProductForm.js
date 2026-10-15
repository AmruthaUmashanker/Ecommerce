/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

// {
//     "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//     ]
//   },
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  getProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectCurrentProduct,
  updateProductAsync,
} from "../../product-list/productSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ProductForm() {
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedProduct = useSelector(selectCurrentProduct);

  useEffect(() => {
    if (params.id) {
      dispatch(getProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    console.log("this is running");
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", +selectedProduct.price);
      // setValue('rating', selectedProduct.rating)
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("image1", selectedProduct?.images?.[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", +selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, setValue, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };
  return (
    <form
      className="p-12 bg-white"
      onSubmit={handleSubmit((data) => {
        // console.log(data)
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];

        console.log(product);
        if (params.id) {
          // update the product
          product.rating = selectedProduct.rating || 0;
          product.id = params.id; // it is required for updating the product
          dispatch(updateProductAsync(product));
          console.log("saved");
          reset();
        } else {
          dispatch(clearSelectedProduct());
          dispatch(createProductAsync(product));
          reset();
        }
      })}
    >
      <div className="space-y-12">
        <div className="text-left border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-semibold leading-7 text-gray-900">
            Add product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="product-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("title", {
                      required: "name is required",
                    })}
                    name="title"
                    id="product-name"
                    autoComplete="product-name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="brands"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: "name is required",
                  })}
                >
                  <option value={""}>--Choose Brand--</option>
                  {brands.map((brand) => (
                    <option value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: "name is required",
                  })}
                >
                  <option value={""}>--Choose Category--</option>
                  {categories.map((category) => (
                    <option value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("price", {
                      required: "price is required",
                    })}
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="discountPercentage"
                    {...register("discountPercentage", {
                      required: "discount is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discount"
                    autoComplete="discount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("stock", {
                      required: "stock is required",
                    })}
                    name="stock"
                    id="stock"
                    autoComplete="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    autoComplete="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Thumbnail Image Url"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    type="text"
                    name="image1"
                    id="image1"
                    autoComplete="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Image Url"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    type="text"
                    name="image2"
                    id="image2"
                    autoComplete="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Image Url"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="image3"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    id="image3"
                    autoComplete="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Image Url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        {selectedProduct && (
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
