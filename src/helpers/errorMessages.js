module.exports = {
  invalidFields: () => (
    { code: 400, message: 'Invalid fields' }
  ),
  requiredFields: () => (
    { code: 400, message: 'Some required fields are missing' }
  ),
};
