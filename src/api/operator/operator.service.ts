import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OperatorRepository } from "../../common/repositories/operator.repository";
import { OperatorCreateDto } from "../../common/dto/operator-create.dto";
import { OperatorEntity } from "../../common/entities/operator.entity";
import {
  OPERATOR_ALREADY_EXIST_MESSAGE,
  OPERATOR_NOT_FOUND_MESSAGE, OPERATOR_WRONG_PASSWORD_MESSAGE
} from "../../common/constants/errorMessages.constant";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { OperatorJwtPayloadInterface } from "./types/operatorJwtPayload.interface";
import { ConfigService } from "@nestjs/config";
import { OperatorLoginDto } from "../../common/dto/operator-login.dto";
import { OperatorResponseInterface } from "./types/operatorResponse.interface";
import { OperatorsResponseInterface } from "./types/operatorsResponse.interface";

@Injectable()
export class OperatorService {
  constructor(
    private readonly operatorRepository: OperatorRepository,
    private readonly configService: ConfigService) {
  }

  async create(dto: OperatorCreateDto, substationId: number): Promise<OperatorEntity> {
    const findByLogin: OperatorEntity = await this.operatorRepository.findOne({login: dto.login});
    if (findByLogin) {
      throw new HttpException(OPERATOR_ALREADY_EXIST_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newOperator: OperatorEntity = new OperatorEntity();
    newOperator.passwordHash = dto.password;
    newOperator.substationId = substationId;
    Object.assign(newOperator, dto);
    await this.operatorRepository.save(newOperator);
    return newOperator;
  }

  async login(dto: OperatorLoginDto): Promise<OperatorEntity> {
    const operator: OperatorEntity = await this.operatorRepository.findOne(
      {
      login: dto.login
    },
      {
        select: ['id', 'login', 'passwordHash', 'lastName', 'firstName', 'fatherName', 'substationId']
      });
    if (!operator) {
      throw new HttpException(OPERATOR_NOT_FOUND_MESSAGE, HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect: boolean = await compare(dto.password, operator.passwordHash);
    if (!isPasswordCorrect) {
      throw new HttpException(OPERATOR_WRONG_PASSWORD_MESSAGE, HttpStatus.UNAUTHORIZED);
    }
    delete operator.passwordHash;
    return operator;
  }

  async getAllBySubstationId(substationId: number): Promise<OperatorEntity[]> {
    const operators: OperatorEntity[] = await this.operatorRepository.find({substationId});
    return operators;
  }

  private generateJwt(operator: OperatorEntity): string {
    const payload: OperatorJwtPayloadInterface = { id: operator.id, login: operator.login };
    const secretKey: string = this.configService.get('JWT_SECRET');
    const jwt: string = sign(payload, secretKey);
    return jwt;
  }

  buildOperatorResponse(operator: OperatorEntity): OperatorResponseInterface {
    return {
      operator: {
        ...operator,
        token: this.generateJwt(operator)
      }
    }
  }

  buildOperatorsResponse(operators: OperatorEntity[]): OperatorsResponseInterface {
    const count: number = operators.length;
    return {
      operators,
      count
    }
  }
}
