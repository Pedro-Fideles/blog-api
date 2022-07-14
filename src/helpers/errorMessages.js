module.exports = {
  invalidFields: () => (
    { code: 400, message: 'Invalid fields' }
  ),
  requiredFields: () => (
    { code: 400, message: 'Some required fields are missing' }
  ),
  registeredUser: (value) => (
    { code: 409, message: `${value} already registered` }
  ),
  wrongLength: (value, min) => (
    { code: 400, message: `"${value}" length must be at least ${min} characters long` }
  ),
  invalidEmail: (value) => (
    { code: 400, message: `"${value}" must be a valid email` }
  ),
};
