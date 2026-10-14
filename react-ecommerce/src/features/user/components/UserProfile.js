import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { computeHeadingLevel } from "@testing-library/react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setshowAddAddressForm] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow capy issues
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    console.log(address);

    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("pinCode", address.pinCode);
    setValue("state", address.state);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow capy issues
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  return (
    <div>
      {!showAddAddressForm && (
        <div className="flex flex-start">
          <button
            onClick={(e) => setshowAddAddressForm(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button>
        </div>
      )}

      {showAddAddressForm && (
        <form
          action=""
          className="bg-white px-5 py-5"
          noValidate
          onSubmit={handleSubmit((data) => {
            console.log(data);

            const update = { ...user, addresses: [...user.addresses, data] };
            dispatch(updateUserAsync(update));
            reset();
            setshowAddAddressForm(false);
            // console.log("data passed to updateUserAsync ",update);
          })}
        >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            {/* Edit */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name", {
                      required: "name is required",
                    })}
                    id="name"
                    // value={address.name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "emailId is required",
                    })}
                    type="email"
                    // value={address.email}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    {...register("phone", {
                      required: "phone is required",
                    })}
                    type="tel"
                    // value={address.phone}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("street", {
                      required: "street is required",
                    })}
                    // value={address.street}
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city", {
                      required: "city is required",
                    })}
                    id="city"
                    // value={address.city}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("state", {
                      required: "state is required",
                    })}
                    // value={address.state}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("pinCode", {
                      required: "pinCode is required",
                    })}
                    id="postal-code"
                    // value={address.pinCode}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={(e) => setshowAddAddressForm(false)}
                className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mx-auto my-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl text-left font-bold tracking-tight text-gray-900 mb-10 mt-5">
            Name: {user?.name ? user.name : "New User"}
          </h1>
          <h3 className="text-2xl text-left font-bold tracking-tight text-gray-900 mb-10 mt-5 text-red-500">
            Email Address : {user.email}
          </h3>
          <p className="text-left"> For Debugging : role : {user.role}</p>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-left mt-6 font-bold"> Your Address : </h1>

          {user.addresses.map((address, index) => (
            <div>
              {selectedEditIndex === index && (
                <form
                  action=""
                  className="bg-white px-5 py-5"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    // console.log("data passed to updateUserAsync ",update);
                  })}
                >
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    {/* Edit */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            // value={address.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "emailId is required",
                            })}
                            type="email"
                            // value={address.email}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            type="tel"
                            // value={address.phone}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            // value={address.street}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            // value={address.city}
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            // value={address.state}
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="postal-code"
                            // value={address.pinCode}
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              )}
              <li className="flex flex-col md:flex-row sm:flex justify-between gap-x-6 py-5 px-7">
                <div className="flex gap-x-4 font-bold">
                  <div className="min-w-0 flex-auto">
                    <p className="text-left text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-left sm:flex sm:flex-col font-bold">
                  <p className="text-left md:text-right text-sm leading-6 text-gray-500">
                    {address.phone}
                  </p>

                  <p className="text- md:text-right text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>

                <div className="flex justify-between sm:justify-start mt-4 md:mt-0 text-left sm:flex sm:flex-col font-bold">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className=" font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
