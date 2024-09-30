/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { CreateAppDto } from './dtos/createApp.dto';
import * as crypto from 'crypto'

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) { }

    async create(createAppDto: CreateAppDto) {
        const newApplicationRepo = this.applicationRepository.create({
            ...createAppDto,
            redirect_uris: createAppDto.redirect_uris.join(','),
            client_secret: crypto.randomBytes(16).toString('hex')
        });
        return await this.applicationRepository.save(newApplicationRepo);
    }
}
