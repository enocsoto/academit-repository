import { response } from "express";

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

class HttpResponse {
  Ok(res = response, data) {
    return res.status(HttpStatus.OK).json({
      statusMsg: "Success",
      data: data,
    });
  }
  Created(res = response, data) {
    return res.status(HttpStatus.CREATED).json({
      statusMsg: "Created",
      data: data,
    });
  }

  NotFound(res = response, data) {
    return res.status(HttpStatus.NOT_FOUND).json({
      statusMsg: "NOT_FOUND",
      error: data,
    });
  }

  Unauthorized(res = response, data) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusMsg: "UNAUTHORIZED",
      error: data,
    });
  }

  Forbiden(res = response, data) {
    return res.status(HttpStatus.FORBIDEN).json({
      statusMsg: "FORBIDEN",
      error: data,
    });
  }

  InternalError(res = response, data) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusMsg: "INTERNAL SERVER ERROR",
      error: data,
    });
  }
}

export default new HttpResponse();
