module.exports = {
    normalizeErrors: function(errors) {
        let normalizeErrors = [];
        for(let key in errors){
            if(errors.hasOwnProperty(key)){
                normalizeErrors.push(createErrorObject(key, errors[key].message));
            }
        }
    }
}

const createErrorObject = (title,detail) => {
    return {
        errors: [
            {
                title,detail
            }
        ]
    }
}