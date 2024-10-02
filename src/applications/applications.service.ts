/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
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

    async validateClient(clientId: string) {
        console.log('clientId:', clientId)
        try {
            const client = await this.applicationRepository.findOne({ where: { id: clientId } });
            console.log('client:', client)
            if (client) {
                return client;
            }
            throw new HttpException('Not found client', 404);
        } catch (error) {
            throw Error(error.message)
        }
    }
}
