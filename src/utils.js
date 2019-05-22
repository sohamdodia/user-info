// Generate error message
const getErrorMessage = (error = {}, message = "Something went wrong.") => {
  const result = {};

  result.status = false;
  result.message = message;
  result.data = null;
  result.error = error;

  return result;
};

// Generate success message
const getSuccessMessage = (
  data = {},
  message = "Request completed successfully."
) => {
  const result = {};

  result.status = true;
  result.message = message;
  result.data = data;
  result.error = null;

  return result;
};

module.exports = {
  getErrorMessage,
  getSuccessMessage
};
