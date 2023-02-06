'use strict';

const errorHandler = async (err, req, res, next) => {
  const error = {
		statusCode: err.statusCode || 500,
		message: err.message || "API 응답 실패",
	}
  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandler;
