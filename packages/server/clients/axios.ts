import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as z from 'zod';

const GET =
    <T>(instance: AxiosInstance) =>
    (
        url: string,
        schema: z.ZodType<T>,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        const request = {
            method: 'get',
            url,
            ...config,
        };

        return instance.request(request).then((response) => {
            const parsedData = schema.parse(response.data);
            return parsedData;
        });
    };

const POST =
    <TRequest, TResponse>(instance: AxiosInstance) =>
    (
        url: string,
        requestData: TRequest,
        requestSchema: z.ZodType<TRequest>,
        responseSchema: z.ZodType<TResponse>,
        axiosConfig?: AxiosRequestConfig
    ): Promise<TResponse> => {
        // Validate request data matches and transform per schema
        const data = requestSchema.parse(requestData);

        return instance
            .post<TResponse>(url, data, axiosConfig)
            .then((response) => {
                // Validate response data
                return responseSchema.parse(response.data);
            });
    };

export const PUT =
    <T, TResponse>(instance: AxiosInstance) =>
    (
        url: string,
        requestData: T,
        requestSchema: z.ZodType<T>,
        responseSchema: z.ZodType<TResponse>,
        axiosConfig?: AxiosRequestConfig
    ): Promise<TResponse> => {
        // Validate request data matches and transform per schema
        const data = requestSchema.parse(requestData);

        return instance
            .put<TResponse>(url, data, axiosConfig)
            .then((response) => {
                // Validate response data
                return responseSchema.parse(response.data);
            });
    };

export const DEL =
    <T>(instance: AxiosInstance) =>
    (
        url: string, // this is so contract dependent that I think it should be on the caller to get this right
        axiosConfig?: AxiosRequestConfig
    ): Promise<T> => {
        return instance.delete(url, axiosConfig).then((response) => {
            return response.data ?? response.status === 204;
        });
    };

export function createAxiosClient(
    baseURL: string,
    axiosConfig?: AxiosRequestConfig // baseURL the big one here
) {
    const axiosInstance = axios.create({ ...(axiosConfig ?? {}), baseURL });

    const get = GET(axiosInstance);
    const post = POST(axiosInstance);
    const put = PUT(axiosInstance);
    const del = DEL(axiosInstance);

    return { axios: axiosInstance, GET: get, POST: post, PUT: put, DEL: del };
}
