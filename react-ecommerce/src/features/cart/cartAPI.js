export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/api/cart', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    });

    const data = await response.json();
    // TODO : on server it will only return some info of user
    resolve({data: item});
  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/cart/'+userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}


export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: 'success' });
  });
}