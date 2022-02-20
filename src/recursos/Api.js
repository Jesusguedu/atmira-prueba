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

export async function getFullNoticias(fechaInicio,fechaFin) {
  return await resolve(
    instance_nasa.get('/planetary/apod?api_key=zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb&start_date='+fechaInicio+'&end_date='+fechaFin).then((res) => res.data)
  );
}

export async function getNoticia(fecha) {
  return await resolve(
    instance_nasa.get('/planetary/apod?api_key=zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb&date='+fecha).then((res) => res.data)
  );
}
