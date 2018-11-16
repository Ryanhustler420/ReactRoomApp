
const minLength = min => value => 
    value && value.length < min ? `Must be ${min} character or more` : undefined

export const minLength4 = minLength(4);

export const require = value => (value ? undefined : 'This input is required');