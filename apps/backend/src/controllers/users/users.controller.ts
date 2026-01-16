import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotIn, IsString, ValidateNested } from 'class-validator';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import { DbService } from '@/services/db.service';
import { JwtService } from '@/services/jwt.service';
import { PasswordService } from '@/services/password.service';
import { AuthService } from '@/services/auth.service';
import { type Request } from 'express';
import { cookieNames } from '@/domain/config';



class RoleDto {
  @IsString()
  id: string;
}

class NewUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}

class OldUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}


@Controller('users')
export class UsersController {
    constructor(
        private readonly dbService: DbService, 
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
        private readonly authService: AuthService,
    ) {}

    @Get()
      async getAll() {
        const users = await this.dbService.users.getAll();
        return { data: users };
      }
    
      @Post()
      async create(@Body() body: NewUserDto) {
        const passwordHash = this.passwordService.hashPassword(body.password);
        const user = await this.dbService.users.create({ ...body, passwordHash});
        return { data: user };
      }
    
      @Put(':userId')
      async update(@Param('userId') userId: string, @Body() body: OldUserDto) {
        const user = await this.dbService.users.update({ userId }, body);
        return { data: user };
      }
    
      @Delete(':userId')
      async remove(@Param('userId') userId: string) {
        const user = await this.dbService.users.remove({ userId });
        return { data: user };
      }
}
