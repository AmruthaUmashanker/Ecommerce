// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/api/orders', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/api/orders/'+ order.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchAllOrders(pagination) {

  const queryString = "";

  return new Promise(async (resolve) =>{
    const response = await fetch('/api/orders?'+ queryString);

    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count")
    resolve({data : {orders: data, totalOrders: +totalOrders}});
  }
  );
}