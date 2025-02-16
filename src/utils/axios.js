import axios from "axios";
const APP_URL = "http://localhost/gutenberg/wp-json/wp/v2/expanse";
const APP_AUTH_URL = "http://localhost/gutenberg/wp-json/jwt-auth/v1/token";
const auth = axios.post(APP_AUTH_URL, {
    username: "talib",
    password: "bdtu021"
})
.then((response) => {
    // console.log(response);
    localStorage.setItem("token", response.data.token);
})
.catch((error) => {
    console.log(error);
});

const token = localStorage.getItem("token");
console.log(token);
const axiosInstance = axios.create({
    baseURL: APP_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
    });

export default axiosInstance;