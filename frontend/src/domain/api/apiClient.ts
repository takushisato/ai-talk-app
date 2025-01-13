import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from '~/utils/api-base-url';
import type { ErrorResponse } from '~/domain/api/error-response';
import { useLayoutStore } from '~/composables/common/use-layout-store';

/**
 * Axiosラッパー関数
 *
 * @param config
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
        const layoutStore = useLayoutStore();
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            const errorDetail = axiosError.response.data.detail;
            layoutStore.error.errorMessage = errorDetail.join('\n') || 'An unknown error occurred.';
            layoutStore.error.isError = true;
        } else {
            layoutStore.error.errorMessage = 'An error occurred during the API call.';
        }
        throw new Error('An error occurred during the API call.');
    }
};
