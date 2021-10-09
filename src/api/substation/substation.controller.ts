import { Body, Controller, Get, Post } from "@nestjs/common";
import { SubstationService } from "./substation.service";
import { SubstationEntity } from "../../common/entities/substation.entity";
import { SubstationCreateDto } from "../../common/dto/substation-create.dto";

@Controller('substation')
export class SubstationController {
  constructor(private readonly substationService: SubstationService) {
  }

  @Post('create')
  async create(@Body('substation') dto: SubstationCreateDto) {
    const substation: SubstationEntity = await this.substationService.create(dto);
    return substation;
  }

  @Get('getAll')
  async getAll() {
    const substations: SubstationEntity[] = await this.substationService.getAll();
    return substations;
  }
}
