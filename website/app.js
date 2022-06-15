//commit of adding the get function with little test on the connection between app.js and server.js
//and it worked :)

//the object data to be posted to local server
let dataToPost = { name: 'this is just test', age: 12 };

//the object to recive the data we get
let dataGet = {};

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



// postDataToLocal('http://127.0.0.1:8080/add', dataToPost);

/* Function to get data from local */
const getDataFromLocal = async(url = '') => {
    const response = await fetch(url, {
        method: 'GET', // GET
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const data = await response.json();
        //to see the data that we got from local server in the console
        console.log('data from local', data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

getDataFromLocal('http://127.0.0.1:8080/all').then((data) => {
    dataGet = data;
    console.log('nowas ', dataGet);
});


// event listener to fire inline function called onClick
document.querySelector('#generate').addEventListener('click', onClick);

function onClick() {
    // check if the zip text empty or not I as a pro programmer did this for a good reason
    //which is to separate errors invalid zip and not even enter zip :)
    if (document.querySelector('#zip').value) {
        const zipValue = document.querySelector('#zip').value;
        // call the function to get web api data
        weatherData(zipValue).then((weatherdata) => {
            //log the respons data 
            console.log('weatherdata', weatherdata);
        });
    } else {
        alert('Can\'t get data without zip code!!\nPlease enter zip');
    }


}

// Personal API Key for OpenWeatherMap API
//the api key is from api.openweathermap.org site and it's for one user only
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = ',&appid=5aca0bbb23343940f01aad543cba2b1c&units=metric';

// Function to get the weather data
async function weatherData(zipValue) {
    //get the data from the api 
    const response = await fetch(baseURL + zipValue + APIKey); // GET by default
    try {
        const responseData = await response.json();
        //if any error in the respond from api then print it and throw error
        if (responseData.cod !== 200) {
            throw new Error(responseData.message);
        } else {
            //get the data from the promise response then return it as an object
            const temprature = responseData.main.temp;
            const cityName = responseData.name;
            const weatherData = {
                cityName,
                temprature
            }
            return weatherData;
        }
    } catch (error) {
        console.log('error', error); //print error for me 'ahmed adel' in the console
        alert(error); //prompt a message to the user to inform him he is idiot not entering zip code
        return reject(error);
    }


}

// const x = async() => {
//     console.log('serf');
//     dataGet = await getDataFromLocal('http://127.0.0.1:8080/all');
//     console.log('now', dataGet);
// }
// x();
// console.log('now', dataGet);