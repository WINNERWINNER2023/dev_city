const Joi = require('joi');
const CustomError = require('../errors/CustomError');
const { asyncWrapper } = require('./asyncWrapper');

const validationMiddleware = {
  checkProduct: asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(10).required(),
      category: Joi.string(),
      contents: Joi.string().min(1).max(50).required(),
      startUse: Joi.string().required(),
      endUse: Joi.string().required(),
      price: Joi.number().required(),
      count: Joi.number().required(),
      files: Joi.string(),
    });
    try {
      await schema.validateAsync(req.body);
    } catch (err) {
      console.log(err.message);
      throw new CustomError(400, '잘못된 요청입니다.');
    }
    next();
  }),
};

module.exports = validationMiddleware;
