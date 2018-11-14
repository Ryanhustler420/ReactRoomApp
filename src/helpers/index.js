import titlelize from 'titlelize';

export const rentalType = isShared => isShared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titlelize(value) : '';