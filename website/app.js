//the object to be posted to local server
let dataToPost = {};

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

// event listener to fire inline function called onClick when clicking on the button
document.querySelector('#generate').addEventListener('click', onClick);
// event listener to fire inline function called onClick when pressing enter key
document.addEventListener('keyup', (keyCode) => {
    if (keyCode.keyCode === 13) {
        onClick();
    }
})

function onClick() {
    // check if the zip text empty or not I as a pro programmer did this for a good reason
    //which is to separate errors invalid zip and not even enter zip :)
    if (document.querySelector('#zip').value) {
        // Create a new date instance dynamically with JS
        //to be used later in updating the DOM
        let date = new Date();
        let usableDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        const zipValue = document.querySelector('#zip').value;
        // call the function to get web api data
        //then post data to local then get the data from local then update UI from the local
        //if all resolve true and no error or reject
        weatherData(zipValue).then((weatherdata) => {
            dataToPost = weatherdata;
            //adding both date & feelings in the data to post object before posting to local 
            dataToPost.date = usableDate;
            dataToPost['howFeel'] = document.getElementById('feelings').value;
            //now post to local 
            postDataToLocal('http://127.0.0.1:8080/add', dataToPost);
        }).then(async() => {
            //get the data first then update the DOM
            dataGet = await getDataFromLocal('http://127.0.0.1:8080/all');
            //now we need to update the DOM
            DOM_update(dataGet);
        });
    } else {
        alert('Can\'t get data without zip code!!\nPlease enter zip\ntry 10001 or 30044 or 30303 or 11233');
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
        if (responseData.cod === 200) {
            //get the data from the promise response then return it as an object
            const temprature = responseData.main.temp;
            const cityName = responseData.name;
            const weatherData = {
                cityName,
                temprature
            }
            return weatherData;
        } else {
            throw new Error(responseData.message);
        }
    } catch (error) {
        console.log('error', error); //print error for me 'ahmed adel' in the console
        alert(error + '\ntry 10001 or 30044 or 30303 or 11233'); //prompt a message to the user to inform him he is idiot not entering zip code
        return reject(error);
    }
}

//function to update the UI and the DOM with the new data
//finally it's the last function in the project ;)
function DOM_update(dataGet) {
    //updating each div element in the DOM
    document.querySelector('#city').innerHTML = dataGet.cityName; // the new city
    document.querySelector('#temp').innerHTML = dataGet.temprature + '&degC'; // the new temprature
    document.querySelector('#content').innerHTML = dataGet.howFeel; // the new feeling content
    document.querySelector('#date').innerHTML = dataGet.date; // the new date

    console.log('DOM updated successfuly :)');
}