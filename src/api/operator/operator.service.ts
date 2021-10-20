import { Injectable } from '@nestjs/common';
import { OperatorRepository } from "../../common/repositories/operator.repository";

@Injectable()
export class OperatorService {
  constructor(private readonly operatorRepository: OperatorRepository) {
  }
}
