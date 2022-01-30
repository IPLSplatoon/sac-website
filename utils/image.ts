import { isBlank } from '~/utils/string';

export async function imageExists(src: string): Promise<boolean> {
    return new Promise(resolve => {
        if (isBlank(src)) {
            return resolve(false);
        }

        const img = new Image();
        img.src = src;

        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
    });
}
