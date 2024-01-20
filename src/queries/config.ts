import axios, { AxiosInstance } from 'axios';

const createInstance = (): AxiosInstance => {
	const customAxios = axios.create({
		baseURL: `http://localhost:3001`,
	});

	return customAxios;
};

const api = createInstance();

export default api;
