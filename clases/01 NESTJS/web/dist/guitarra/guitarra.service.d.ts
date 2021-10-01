import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class GuitarraService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Guitarra[]>;
    buscarUno(id: number): Prisma.Prisma__GuitarraClient<import(".prisma/client").Guitarra>;
    crearUno(guitarra: Prisma.GuitarraCreateInput): Prisma.Prisma__GuitarraClient<import(".prisma/client").Guitarra>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.GuitarraUpdateInput;
    }): Prisma.Prisma__GuitarraClient<import(".prisma/client").Guitarra>;
    eliminarUno(id: number): Prisma.Prisma__GuitarraClient<import(".prisma/client").Guitarra>;
}
