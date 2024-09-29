/* eslint-disable prettier/prettier */

import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
// import { UserCreateDto } from "./dtos/user-create.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    // @Post('create-user')
    // async createUser(@Body() dto: UserCreateDto) {
    //     return this.userService.createUser(dto)
    // }
}
