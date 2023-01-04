export const errors = {
    FILTER_INVALID: {
        detail: '{{filter.inValid}}',
        code: 1,
    },
    ORDER_INVALID: {
        detail: '{{order.inValid}}',
        code: 2,
    },
    INVALIDATION_FAIL: {
        code: 3,
    },
    LOGIN_ERROR_UNAUTHORIZE: {
        detail: '{{token.unAuthorize}}',
        code: 4,
    },
    EMAIL_EXIST: {
        code: 5,
        detail: '{{email.isAlreadeExist}}',
    },
    LOGIN_ERROR_MISSING: {
        detail: '{{token.isMissing}}',
        code: 6,
    },
    SEQUELIZE_ERROR: {
        code: 7,
        detail: '{{sequelize.error}}',
    },
};
