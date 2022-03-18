import path from 'path';

export const resolve = {
    alias: {
        '@app': path.resolve(__dirname, './'),
        '@typings': path.resolve(__dirname, './typings/'),
        '@hooks': path.resolve(__dirname, './hooks/')
    }
};