import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotIn, IsString, ValidateNested } from 'class-validator';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import { DbService } from '@/services/db.service';
import { JwtService } from '@/services/jwt.service';
import { PasswordService } from '@/services/password.service';

class RoleDto {
  @IsString()
  id: string;
}

class UserDto {
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


@Controller('users')
export class UsersController {
    constructor(
        private readonly dbService: DbService, 
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
    ) {}

    @Get()
      async getAll() {
        const users = await this.dbService.users.getAll();
        return { data: users };
      }
    
      @Post()
      async create(@Body() body: UserDto) {

        const passwordHash = this.passwordService.hashPassword(body.password);

        const users = await this.dbService.users.create({ ...body, passwordHash});
        return { data: role };
      }
    









    
      @Put(':userId')
      async update(@Param('roleId') roleId: string, @Body() body: RoleDto) {
        const role = await this.dbService.roles.update({ roleId }, body);
        return { data: role };
      }
    
      @Delete(':userId')
      async remove(@Param('roleId') roleId: string) {
        const newTenant = await this.dbService.roles.remove({ roleId });
        return { data: newTenant };
      }
}
