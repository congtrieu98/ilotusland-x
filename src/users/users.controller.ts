/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dtos/user-create.dto";
// import { User } from "./entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('create')
    async createUser(@Body() dto: UserCreateDto) {
        return this.userService.create(dto)
    }
}
