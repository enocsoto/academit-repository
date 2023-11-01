import { request, response } from "express";
import HttpResponse from "../../utils/errorHandler.js";
import { AuthService } from "../service/index.js";

class AuthGoogle {
  login(req = request, res = response) {
    try {
      const auth = AuthService.loginUser(req);
      HttpResponse.Ok(res, auth);
    } catch (error) {
      HttpResponse.Forbiden(res, error.message);
    }
  }

  register(req = request, res = response) {
    try {
      const auth = AuthService.registerUser(req);
      HttpResponse.Ok(res, auth);
    } catch (error) {
      HttpResponse.Forbiden(res, error);
    }
  }
}

export default new AuthGoogle();
