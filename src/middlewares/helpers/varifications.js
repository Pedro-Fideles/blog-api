module.exports = {
  isUndefined: (value) => !value,
  lengthSmallerThan: (value, min) => value.length < min,
  emailIsNotValid: (value) => {
    const regexValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return !regexValidEmail.test(value);
  },
};