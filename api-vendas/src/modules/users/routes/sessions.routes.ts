import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UsersController from "../controllers/UsersController";

const sessionsRouter = Router();
const userController = new UsersController();

sessionsRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required
        }
    }),
    userController.create)

export default sessionsRouter;