import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GuitarraService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}

  buscarMuchos(parametrosBusqueda: {
    skip?: number; // registros que te saltes 0 10 20
    take?: number; // registros tomas 10 10 10
    busqueda?: string; // Adr
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
        OR: [
          { nombre: { contains: parametrosBusqueda.busqueda } },

        ],
      }
      : {};
    console.log(or);
    return this.prisma.guitarra.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUno(id: number) {
    return this.prisma.guitarra.findUnique({
      where: {
        id: id,
      },
    });
  }

  crearUno(guitarra: Prisma.GuitarraCreateInput) {
    return this.prisma.guitarra.create({
      data: guitarra,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.GuitarraUpdateInput;
  }) {
    return this.prisma.guitarra.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.guitarra.delete({
      where: { id: id },
    });
  }
}
