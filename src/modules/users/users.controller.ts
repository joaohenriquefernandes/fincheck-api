import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the user profile' })
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
}
