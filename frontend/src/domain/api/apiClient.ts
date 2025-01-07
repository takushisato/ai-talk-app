import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from '~/utils/api-base-url';
import type { ErrorResponse } from '~/domain/api/error-response';

/**
 * Axiosラッパー関数
 */
export const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const token = useCookie('token').value;
        const headers = {
            ...config.headers,
            ...(token && { Authorization: `Token ${token}` }), // トークンが存在する場合のみ Authorization を追加
        };

        const response: AxiosResponse<T> = await axios({
            baseURL: apiBaseUrl(),
            ...config,
            headers,
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            const errorData = axiosError.response.data;
            const errorMessage = Object.values(errorData)[0]?.[0] || 'An unknown error occurred.';
            console.error(`API Error: ${errorMessage}`);
            throw new Error(errorMessage);
        } else {
            console.error('Unknown error occurred:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};
