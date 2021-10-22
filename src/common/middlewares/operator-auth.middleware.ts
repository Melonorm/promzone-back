import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { RequestWithOperator } from "../types/requestWithOperator.interface";
import { verify } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { OperatorEntity } from "../entities/operator.entity";
import { OperatorService } from "../../api/operator/operator.service";

@Injectable()
export class OperatorAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService,
              private readonly operatorService: OperatorService) {
  }

  async use(request: RequestWithOperator, res: Response, next: NextFunction) {
    if (!request.headers.authorization) {
      request.operator = null;
      next();
      return;
    }
    const jwt = request.headers.authorization.split(" ")[1];
    try {
      const secretKey: string = this.configService.get('JWT_SECRET');
      const decode: any = verify(jwt, secretKey, { complete: false });
      const operator: OperatorEntity = await this.operatorService.findById(decode.id);
      request.operator = operator;
    }
    catch (e) {
      request.operator = null;
    }
    finally {
      next();
    }
  }
}