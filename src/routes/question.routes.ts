import express from 'express';
import { Request, Response } from 'express';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { fn, col } from 'sequelize';

const router = express.Router();

router.route('/id/:id')
    .get((req: Request, res: Response) => {
        var { id } = req.params;

        Question.findOne({ where: { id } })
            .then(question => {
                if (question) {
                    Answer.findAll({
                        where: { idQuestion: id },
                        attributes: [ 'id', 'value', 'idQuestion', [fn('date_format', col('createdAt'), '%w-%d-%m-%Y-%T'), 'createdAt'] ]
                    })
                        .then(answers => {
                            return res.render('question', { question, answers });
                        })
                        .catch(err => console.error(err));
                } else return res.redirect('/404');
            })
            .catch(err => {
                console.error(err);
                return res.redirect('/');
            });
    })
    .post((req: Request, res: Response) => {
        var { id } = req.params;
        var { answer } = req.body;

        if (answer) {
            Answer.create({ value: answer, idQuestion: id })
                .then(() => {})
                .catch(err => console.error(err));

            return res.redirect(`/question/${id}`);
        } else return res.redirect(`/question/${id}`);
        
    });

router.route('/new/')
    .get((_, res: Response) => res.render('newQuestion'))
    .post((req: Request, res: Response) => {
        const { title, description } = req.body;

        Question.create({ title, description })
            .then(() => {})
            .catch(err => console.error(err));

        return res.redirect('/');
    });

export default router;