import {Student, Auth} from '../../infrastructure/model/index.js';
import * as bcrypt from 'bcrypt';
class AuthService {
  loginUser(req) {
    try {
      const user = req.user;
      if (!user) throw new Error`Not User FOUND`();
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async registerUser(req) {
    try {
      const {password, email} = req.body;
      const validEmail = await Student.findOne({where: {email}});
      if(!validEmail) 
        throw new Error(`The email ${validEmail} does not exist`);
      const idStudent = validEmail.id;
      const student = await Auth.create({email, password, studentId: idStudent});
      return student;
    } catch (error) {
     throw new Error(`Error creating user: ${error.message}`);
    }
  }
}

export default new AuthService();