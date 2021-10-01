import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GuitarraService } from './guitarra.service';
import { GuitarraController } from './guitarra.controller';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    GuitarraService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    GuitarraService,
  ],
  controllers: [
    // declaramos controladores
    GuitarraController,
  ],
})
export class GuitarraModule {}
