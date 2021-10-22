import { Request } from "express";
import { OperatorEntity } from "../entities/operator.entity";


export interface RequestWithOperator extends Request {
  operator?: OperatorEntity
}