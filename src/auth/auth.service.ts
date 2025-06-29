import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const STATIC_USER = {
      id: 1,
      username: 'admin',
      password: 'p4ssw0rd',
      roles: ['admin'],
    };

    if (username === STATIC_USER.username && password === STATIC_USER.password) {
      const { password: _pwd, ...userWithoutPass } = STATIC_USER;
      return userWithoutPass;    
    }
    return null;                  
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) };
  }
}