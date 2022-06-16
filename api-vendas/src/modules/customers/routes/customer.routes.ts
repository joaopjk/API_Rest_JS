import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controllers/CustomersContollers";

const customersRoutes = Router();
const customersController = new CustomersController();

customersRoutes.get("/", customersController.index);

customersRoutes.get("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customersController.show);

customersRoutes.post("/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required()
        }
    }),
    customersController.create);

customersRoutes.put("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required()
    }
}), customersController.update);

customersRoutes.delete("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    customersController.delete);

export default customersRoutes;