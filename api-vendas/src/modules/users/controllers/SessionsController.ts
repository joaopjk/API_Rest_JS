import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

class SessionsController {
    public async createSession(request: Request, reponse: Response): Promise<Response> {
        const { email, password } = request.params;
        const createSession = new CreateSessionsService();
        const user = await createSession.execute({ email, password });
        return reponse.json(user);
    }
}

export default SessionsController;