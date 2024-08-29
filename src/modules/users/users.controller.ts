import { Body, Controller, NotFoundException, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() userDto: UserDto): Promise<User>{
        return this.userService.create(userDto);
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<User>{
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get('id/:id')
    async getUserById(@Param('id') id: number): Promise<User>{
        const user = await this.userService.findOneById(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

}
