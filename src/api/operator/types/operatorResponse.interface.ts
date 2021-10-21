import { OperatorType } from "./operator.type";

export interface OperatorResponseInterface {
  operator: OperatorType & { token: string };
}
