// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/products");
    const data = await response.json();
    resolve({data});
  }
  );
}


export function fetchProductsByFilter({filter, sort, pagination}) {
  // pagination - { _page and _limit }

  // TODO : On server we will support multiple values
  let queryString = '';
  for (let key in filter) {
    if (Array.isArray(filter[key])) {
      // If the value is an array, iterate through its elements
      for (let value of filter[key]) {
        queryString += `${key}=${value}&`;
      }
    } else {
      // If the value is not an array, treat it as a single value
      queryString += `${key}=${filter[key]}&`;
    }
  }
  // Remove the trailing '&' character from the queryString
  // queryString = queryString.slice(0, -1);
  // console.log(queryString);

  // for sorting
 
  if (Object.keys(sort).length !== 0) {
    queryString += "_sort="+sort["_sort"] +"&";
    queryString += "_order="+sort["_order"]+"&";
  }

  if (Object.keys(pagination).length !== 0) {
    queryString += "_page="+pagination["_page"] +"&";
    queryString += "_limit="+pagination["_limit"];
  }



  console.log(queryString)
  
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch(`/api/products?${queryString}`);
    const data = await response.json();

     // get total Count using X-Total-Count
    const totalItems = response.headers.get("X-Total-Count");



    resolve({data : {products: data, totalItems: totalItems}});
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/brands");
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/categories");
    const data = await response.json();
    console.log(data[0]);
    
    resolve({data});
  }
  );
}

export function getProductById(id) {
  return new Promise(async (resolve) =>{
    // TODO: we will not harcode server url here
    const response = await fetch("/api/products/"+id);
    const data = await response.json();
    console.log(data);
    
    resolve({data});
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/api/products/', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await response.json();
    // TODO : on server it will only return some info of user
    resolve({data});
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/products/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}
