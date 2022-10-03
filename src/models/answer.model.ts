import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

export class Answer extends Model {

    public value!: string;
    public idQuestion!: number;
}

Answer.init(
    {
        value: { type: DataTypes.STRING, allowNull: false },
        idQuestion: { type: DataTypes.INTEGER, allowNull: false }
    }, { tableName: 'answers', sequelize }
);

Answer.sync({ force: false })
    .then(() => {})
    .catch(err => console.error(err));