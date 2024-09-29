/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateAppDto } from './dtos/createApp.dto';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationsController {
    constructor(
        private readonly applicationService: ApplicationsService
    ) { }

    @Post('create')
    create(@Body() createAppDto: CreateAppDto): Promise<Application> {
        return this.applicationService.create(createAppDto)
    }

}
