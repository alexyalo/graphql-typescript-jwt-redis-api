import { Table, Column, Model, BeforeSave } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { environment } from '../../../environment';

@Table({timestamps: true})
export class User extends Model<User> {

  @Column({primaryKey: true, autoIncrement: true})
  id: number;

  @Column({unique: true})
  email: string;

  @Column
  password: string;

  jwt: string;
  login: boolean;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.changed('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        
        user.password = hash;
    }
  }

  async comparePassword(password: string) {
      if(!this.password) {
        throw new Error('Does not have password');
      }

      const pass = await bcrypt.compare(password, this.password);

      if(!pass) {
        throw 'Invalid password';
      }

      return this;
  };

  getJwt(){
      return 'Bearer ' + jsonwebtoken.sign({
          id: this.id,
      }, environment.jwtEncryption, { expiresIn: environment.jwtExpiration });
  }
}