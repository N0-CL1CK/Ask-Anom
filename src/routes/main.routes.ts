import express from 'express';
import { Request, Response } from 'express';
import { Question } from '../models/question.model';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    var { k } = req.query;
    if (k) Question.findAll({ where: { title: {[Op.like]: `%${k}%`} } })
        .then(questions => res.render('home', { questions }))
        .catch(err => res.render('home', { err }));
    else Question.findAll()
        .then(questions => res.render('home', { questions }))
        .catch(err => res.render('home', { err }));
});

router.get('/404', (_, res: Response) => res.render('404'));

export default router;