import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  }
}
