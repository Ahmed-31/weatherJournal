//commit of adding the post function with little test on the connection between app.js and server.js
//and it worked :)

//the object data to be posted to local server
let dataToPost = { name: 'this is just test', age: 12 };

/* Function to POST data to local server on 8080 port */
//it is async function to allow usage of await 
const postDataToLocal = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // POST
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        //to see the data that are posted in the console
        console.log('data to post to local', data);
    } catch (error) {
        console.log("error", error);
    }

}

postDataToLocal('http://127.0.0.1:8080/add', dataToPost);