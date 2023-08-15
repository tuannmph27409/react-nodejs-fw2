import Joi from "joi"
export const productSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string(),
  categoryId: Joi.string(),
});
