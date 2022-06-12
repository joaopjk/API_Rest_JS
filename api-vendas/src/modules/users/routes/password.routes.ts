import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

const passwordRouter = Router();
const forgotController = new ForgotPasswordController();

passwordRouter.post("/forgot",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        }
    }),
    forgotController.create);

export default passwordRouter;