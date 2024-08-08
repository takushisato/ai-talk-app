import {
    BadRequestException,
    ClientException,
    ConflictException,
    NotFoundException,
    ServerException,
    UnauthorizedException,
} from '~/domain/common/exceptions/api-exceptions';
import { useLayoutStore } from '~/composables/common/use-layout-store';

export function processErrorResponse(status: number, message: string) {
    const layoutStore = useLayoutStore();
    if (status === 401) {
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new UnauthorizedException(status, message);
    } else if (status === 400) {
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new BadRequestException(status, message);
    } else if (status === 404) {
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new NotFoundException(status, message);
    } else if (status === 409) {
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new ConflictException(status, message);
    } else if (status >= 402 && status < 500) {
        console.error(status);
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new ClientException(status, message);
    } else if (status >= 500) {
        console.error(status);
        layoutStore.error.isError = true;
        layoutStore.error.errorMessage = message;
        throw new ServerException(status, message);
    }
}
