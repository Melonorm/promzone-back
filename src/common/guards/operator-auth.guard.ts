import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestWithOperator } from "../types/requestWithOperator.interface";
import { UNAUTHORIZED_MESSAGE } from "../constants/errorMessages.constant";

@Injectable()
export class OperatorAuthGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithOperator = context.switchToHttp().getRequest<RequestWithOperator>();
    if (request.operator) {
      return true;
    }
    throw new HttpException(UNAUTHORIZED_MESSAGE, HttpStatus.UNAUTHORIZED);
  }
}