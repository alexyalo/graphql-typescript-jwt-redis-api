import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { environment } from '../../../environment';

const options: SequelizeOptions = {
    host: environment.database.host,
    database: environment.database.name,
    port: +environment.database.port,
    dialect: environment.database.dialect,
    username: environment.database.user,
    password: environment.database.password,
    logging: false,
    storage: ':memory:',
    modelPaths: [__dirname + '/*.model.ts'],
    modelMatch: (filename, member) => {
       return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
};

export const sequelize = new Sequelize(options);
export { User } from './user.model';