export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/users/"+userId);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/orders/?user.id="+userId);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/users/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    console.log("auth api ", data);
    
    resolve({ data });
  });
}
