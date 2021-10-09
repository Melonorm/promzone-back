import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SubstationRepository } from "../../common/repositories/substation.repository";
import { SubstationCreateDto } from "../../common/dto/substation-create.dto";
import { SubstationEntity } from "../../common/entities/substation.entity";
import {
  SUBSTATION_ALREADY_EXIST_MESSAGE
} from "../../common/constants/errorMessages.constant";
import { addDays } from "date-fns";

@Injectable()
export class SubstationService {
  constructor(private readonly substationRepository: SubstationRepository) {
  }

  async create(dto: SubstationCreateDto): Promise<SubstationEntity> {
    const findByName: SubstationEntity = await this.substationRepository.findOne({
      name: dto.name
    });
    if (findByName) {
      throw new HttpException(SUBSTATION_ALREADY_EXIST_MESSAGE, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const substation: SubstationEntity = new SubstationEntity();
    Object.assign(substation, dto);
    await this.substationRepository.save(substation);
    return substation;
  }

  async getAll(): Promise<SubstationEntity[]> {
    return this.substationRepository.find();
  }
}
