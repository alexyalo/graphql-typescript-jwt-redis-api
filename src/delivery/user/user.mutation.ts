import { resolver as rs } from 'graphql-sequelize';
import { User } from '../../infrastructure/sequelize/models';

export const Mutation = {
    createUser: rs(User, {
      before: async (findOptions, { data }) => {
        let user = await User.create(data);
        findOptions.where = { id:user.id };
        
        return findOptions;
      },
      after: (user) => {
        user.login = true;
        
        return user;
      }
    }),
};