export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details
    });
  }

  res.status(500).json({
    error: 'Internal Server Error'
  });
};