"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarraService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let GuitarraService = class GuitarraService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarMuchos(parametrosBusqueda) {
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
    buscarUno(id) {
        return this.prisma.guitarra.findUnique({
            where: {
                id: id,
            },
        });
    }
    crearUno(guitarra) {
        return this.prisma.guitarra.create({
            data: guitarra,
        });
    }
    actualizarUno(parametrosActualizar) {
        return this.prisma.guitarra.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }
    eliminarUno(id) {
        return this.prisma.guitarra.delete({
            where: { id: id },
        });
    }
};
GuitarraService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GuitarraService);
exports.GuitarraService = GuitarraService;
//# sourceMappingURL=guitarra.service.js.map