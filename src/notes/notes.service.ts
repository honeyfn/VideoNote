import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: createNoteDto,
    });
  }

  findAll() {
    return this.prisma.note.findMany();
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Nota no encontrada');

    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(id: number) {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('Nota no encontrada');

    return this.prisma.note.delete({
      where: { id },
    });
  }
}