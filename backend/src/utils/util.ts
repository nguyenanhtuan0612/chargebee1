import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (
        value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length
    ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @method parseBool
 * @param {any} data
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const parseBool = (data: any): boolean => {
    return data == 'true' ? true : false;
};
