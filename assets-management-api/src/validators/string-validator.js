const logger = require('../utils/logger.utils');


const validateString = (stringToBeChecked) => {
    if (!stringToBeChecked) {
        return false;
    }

    if (typeof (stringToBeChecked) != 'string') {
        return false;
    }

    if (stringToBeChecked.trim() === '') {
        return false;

    }

    return true;

};

module.exports = { validateString };