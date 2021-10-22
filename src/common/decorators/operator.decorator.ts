import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithOperator } from "../types/requestWithOperator.interface";

export const Operator =createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request: RequestWithOperator = ctx.switchToHttp().getRequest<RequestWithOperator>();
    if (!request.operator) {
      return null;
    }
    if (data) {
      return request.operator[data];
    }
    return request.operator;
});