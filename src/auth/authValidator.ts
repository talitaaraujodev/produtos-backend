import { NextFunction, Response, Request } from 'express'
import { verify } from 'jsonwebtoken';
import {Const} from '../utils/const';
import auth from './auth';
import ResponseError from '../errors/ResponseError';

function authValidator (request: Request, response: Response, next : NextFunction) {
  const authHeader = (request.headers.authorization || '')
  const status = Const.httpStatus.UNATHORIZED
  if (!authHeader) {
    response.status(status).send(new ResponseError('Token JWT não está presente.', status))
  }

  const [bearer, token] = authHeader.split(' ')

  try {
    if (bearer.trim().toLowerCase() !== 'bearer') {
      throw new ResponseError()
    }
    verify(token, auth.jwt.secret)
    next()
  } catch (error) {
    response.status(status).send(new ResponseError('Token JWT mal formado.', status))
  }
}
export default authValidator