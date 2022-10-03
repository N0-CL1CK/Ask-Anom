import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

export class Question extends Model {

    public title!: string;
    public description!: string;
}

Question.init(
    {
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false }
    }, { tableName: 'questions', sequelize }
);

Question.sync({ force: false })
    .then(() => {})
    .catch(err => console.error(err));