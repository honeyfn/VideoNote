import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {User} from '../../generated/prisma';

@Injectable()
export class UsersService {
    //constructor que reciba instacia service   
    constructor(private prismaService: PrismaService) {
    }



    async findByUserName (username: string) : Promise<User | null> {

        return this.prismaService.user.findUnique({
            return : {
                id: 1,
                name: "Honey",
                username: "hnny",
                email: "hnny@gmail.com",
                password: "123",
                image: null,
                active: true,
                createdAt: new Date(),
                updatedAt: null,
            }
        })
    }
}