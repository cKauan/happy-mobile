import Axios from "axios";
const remoteUrl = "https://happy-servidor.herokuapp.com/";

const Api = Axios.create({
    baseURL: remoteUrl,
});

export default Api;
