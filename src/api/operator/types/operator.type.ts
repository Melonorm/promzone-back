import { OperatorEntity } from "../../../common/entities/operator.entity";

export type OperatorType = Omit<OperatorEntity, 'hashPassword'>;