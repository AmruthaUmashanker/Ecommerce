import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrders } from "../userAPI";
import { selectUserInfo } from "../userSlice";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/constants";

const UserOrders = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);
    console.log("orders", orders);
    
    useEffect(()=>{
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [])

    const chooseColor = (status)=>{
      switch(status){
        case 'pending': 
          return 'bg-purple-200 text-purple-600';
        case "dispatched": 
          return 'bg-green-200 text-green-600';
        case "delivered": 
          return 'bg-yellow-200 text-yellow-600';
        case "cancelled": 
          return 'bg-red-200 text-red-600';

        default: 
        return ''
      }
    }

  return <div>
    {
        orders.map((order)=>
            (
                
                <div className="mx-auto my-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl text-left font-bold tracking-tight text-gray-900 mb-10 mt-5">
            Order #{order.id}
          </h1>
          <h3 className={`${chooseColor(order.status)} text-2xl text-left font-bold tracking-tight text-gray-900 mb-10 mt-5 text-red-500`}>
            Order Status : {order.status}
          </h3>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">{discountedPrice(item)}</p>
                      </div>
                      <p className="text-left mt-1 text-sm text-gray-500">
                        {item.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="password"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty : {item.quantity}
                        </label>
                                                
                      </div>

                      <div className="flex">
                        
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="my-3 flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${order.totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items In Cart</p>
            <p>{order.totalItems} items</p>
          </div>  

          <h1 className="text-left mt-6 font-bold"> Shipping Address</h1>
        <li className="flex justify-between gap-x-6 py-5 px-7">
        
          <div className="flex gap-x-4 font-bold">
            <div className="min-w-0 flex-auto">
              <p className="text-left text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
              <p className="text-left mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.pinCode}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end font-bold">
            <p className="text-right text-sm leading-6 text-gray-500">{order.selectedAddress.phone}</p>
           
            <p className="text-right text-sm leading-6 text-gray-500">{order.selectedAddress.city}</p>
           
            
          </div>
        </li>
    
        </div>
      </div>
    
            )
        )
    }
  </div>;
};

export default UserOrders;
