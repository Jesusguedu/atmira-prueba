import axios from "axios";

// Instancia para la api de la NASA
var instance_nasa = axios.create({
    baseURL: 'https://api.nasa.gov',
    timeout: 10000000,
});

async function resolve(promise) {
    const resolved = {
        data: null,
        error: null,
    };

    try {
        resolved.data = await promise;
    } catch (e) {
        if (e.response && e.response.data && e.response.data.error) {
            resolved.error = e.response.data.error;
        } else {
            resolved.error = "Se ha producido un error";
        }
    }

    return resolved;
}

export async function getData(date) {
  return await resolve(
    instance_nasa.get('/planetary/apod?api_key=DEMO_KEY&date='+date).then((res) => res.data)
  );
}
