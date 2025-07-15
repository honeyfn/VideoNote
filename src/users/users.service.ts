import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User, PublicUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const existing = this.users.find(u => u.email === createUserDto.email);
    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: User = {
      id: this.users.length + 1,
      email: createUserDto.email,
      password: hashedPassword,
    };

    this.users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  findAll(): PublicUser[] {
    return this.users.map(({ password, ...rest }) => rest);
  }
}