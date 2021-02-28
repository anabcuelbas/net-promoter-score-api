import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    // http://localhost:3333/answers/3?u=efd7c487-c790-47ba-9a68-ded8037c9abe
    /**
     * Route Params => Parametros que compõe a rota (answers e 3)
     * routes.get("/answers/:value")
     * 
     * Query Params => Busca, paginação, não obrigatórios (vem depois do ?)
     * chave=valor
     */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            throw new AppError( "Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }