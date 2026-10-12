// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    // TODO : on server it will only return some info of user
    resolve({data});
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) =>{
    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if(data.email){
      resolve({data})
    } else {
      alert("Enter Valid Credentials")
      reject({data})
    }
    console.log(data);
    
    // TODO : on server it will only return some info of user
    // resolve({data});
  }
  );
}

export function logoutUser() {
  return new Promise(async (resolve) =>{
    // do something on server like deleting all stuff and all
    setTimeout(() => {
    resolve({data: "success"});
    }, 1000);
    // TODO : on server it will only return some info of user
  }
  );
}