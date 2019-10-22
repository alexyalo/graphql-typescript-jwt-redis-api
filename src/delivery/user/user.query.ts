import { resolver } from 'graphql-sequelize';
import { User } from '../../infrastructure/sequelize/models';

export const Query = {
    getUser: resolver(User, {
        before: async (findOptions, {}, {user}) => {
            findOptions.where = {id: user.id};
            return findOptions;
        },
        after: (user) => {
            return user;
        }
    }),
    loginUser: resolver(User, {
        before: async (findOptions, { email }) => {
            findOptions.where = {email};
            return findOptions;
        },
        after: async (user, { password }) => {
            user = await user.comparePassword(password);
            user.login = true;
            
            return user;
        }
    }),
};