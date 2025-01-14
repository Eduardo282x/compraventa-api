import { Controller, Get } from '@nestjs/common';
import { MainloadService } from './mainload.service';
import { DtoBaseResponse } from 'src/dto/base.dto';

@Controller('mainload')
export class MainloadController {

    constructor(private mainloadService: MainloadService) {
        
    }

    @Get()
    async loadBaseData(): Promise<DtoBaseResponse>{
        return await this.mainloadService.loadBaseData();
    }
}
