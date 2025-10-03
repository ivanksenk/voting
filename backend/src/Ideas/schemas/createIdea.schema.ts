import Joi from "joi";

export const createIdeaSchema = Joi.object({
    title: Joi.string()
        .required()
        .min(5),
    description: Joi.string()
        .min(5)
}).required();