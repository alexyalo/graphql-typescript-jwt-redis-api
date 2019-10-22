import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";
import { User } from "../../infrastructure/sequelize/models";

export class IsAuthUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      let authUser, user;
      [user, {}, {authUser}] = args;
      console.log('run');
      if ((authUser && authUser.id === user.id) || user.login) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error('You must be the authenticated user to get this information');
      }
    };
  }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      let userInfo;
      [, {}, {user: userInfo}] = args;
      if(!userInfo){
        throw new Error('Unauthorized');
      }

      let authUser = await User.findOne({where: {id: userInfo.id}});
      if(!authUser){
         throw new Error('JWT token error');
      }

      args[2].authUser = authUser;
      return resolve.apply(this, args);
    };
  }
}