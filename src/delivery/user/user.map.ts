import { User } from '../../infrastructure/sequelize/models';

export const UserMap = {
    jwt: (user: User) => user.getJwt(),
};