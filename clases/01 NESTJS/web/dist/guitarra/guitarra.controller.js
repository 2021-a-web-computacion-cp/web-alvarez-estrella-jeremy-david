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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarraController = void 0;
const guitarra_service_1 = require("./guitarra.service");
const common_1 = require("@nestjs/common");
const guitarra_crear_dto_1 = require("./dto/guitarra-crear.dto");
const class_validator_1 = require("class-validator");
const json_1 = require("ts-jest/dist/utils/json");
const guitarra_actualizar_dto_1 = require("./dto/guitarra-actualizar.dto");
let GuitarraController = class GuitarraController {
    constructor(guitarraService) {
        this.guitarraService = guitarraService;
    }
    async listaGuitarras(response, parametrosConsulta) {
        try {
            const respuesta = await this.guitarraService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            response.render('guitarra/listarguitarras', {
                datos: {
                    guitarras: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    crearGuitarra(response, parametrosConsulta) {
        response.render('guitarra/crearguitarra', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async crearGuitarraForm(response, parametrosCuerpo) {
        const guitarraCrearDto = new guitarra_crear_dto_1.GuitarraCrearDto();
        guitarraCrearDto.nombre = parametrosCuerpo.nombre;
        guitarraCrearDto.fechaLlegada = new Date(parametrosCuerpo.fechaLlegada);
        guitarraCrearDto.puenteFlotante = !!(parametrosCuerpo.puenteFlotante);
        guitarraCrearDto.precio = parseFloat(parametrosCuerpo.precio);
        console.log(guitarraCrearDto.puenteFlotante);
        try {
            const errores = await class_validator_1.validate(guitarraCrearDto);
            console.log(errores);
            if (errores.length > 0) {
                response.redirect('/guitarra/crear-guitarra' +
                    '?mensaje= Datos mal ingresados, intente de nuevo');
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.guitarraService.crearUno(guitarraCrearDto);
                response.redirect('/guitarra/crear-guitarra' +
                    '?mensaje= Se ha creado la guitarra ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando guitarra');
        }
    }
    async eliminarguitarra(response, parametrosRuta) {
        try {
            await this.guitarraService.eliminarUno(+parametrosRuta.idguitarra);
            response.redirect('/guitarra/lista-guitarras' + '?mensaje=Se elimino la guitarra');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async obtenerUno(response, parametrosRuta) {
        try {
            const respuesta = await this.guitarraService.buscarUno(+parametrosRuta.idguitarra);
            console.log("-----------------------------");
            console.log(respuesta);
            response.render('guitarra/actualizarguitarra', {
                datos: {
                    guitarras: respuesta,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async actualizarGuitarraForm(response, parametrosCuerpo, parametrosRuta) {
        const guitarraActualizarDto = new guitarra_actualizar_dto_1.GuitarraActualizarDto();
        guitarraActualizarDto.nombre = parametrosCuerpo.nombre;
        guitarraActualizarDto.fechaLlegada = new Date(parametrosCuerpo.fechaLlegada);
        guitarraActualizarDto.puenteFlotante = !!(parametrosCuerpo.puenteFlotante);
        guitarraActualizarDto.precio = parseFloat(parametrosCuerpo.precio);
        try {
            const errores = await class_validator_1.validate(guitarraActualizarDto);
            if (errores.length > 0) {
                response.redirect('/guitarra/lista-guitarras' +
                    '?mensaje=No se pudo actualizar los datos de la guitarra, intente de nuevo');
                console.log(JSON, json_1.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.guitarraService.actualizarUno({
                    id: +parametrosRuta.idguitarra,
                    data: guitarraActualizarDto,
                });
                response.redirect('/guitarra/lista-guitarras' +
                    '?mensaje= Se actualizo correctamente la guitarra ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error actualizando guitarra');
        }
    }
};
__decorate([
    common_1.Get('lista-guitarras'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GuitarraController.prototype, "listaGuitarras", null);
__decorate([
    common_1.Get('crear-guitarra'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GuitarraController.prototype, "crearGuitarra", null);
__decorate([
    common_1.Post('crear-guitarra-form'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GuitarraController.prototype, "crearGuitarraForm", null);
__decorate([
    common_1.Post('eliminar-guitarra/:idguitarra'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GuitarraController.prototype, "eliminarguitarra", null);
__decorate([
    common_1.Post('actualizar-guitarra/:idguitarra'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GuitarraController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post('actualizar-guitarra-form/:idguitarra'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GuitarraController.prototype, "actualizarGuitarraForm", null);
GuitarraController = __decorate([
    common_1.Controller('guitarra'),
    __metadata("design:paramtypes", [guitarra_service_1.GuitarraService])
], GuitarraController);
exports.GuitarraController = GuitarraController;
//# sourceMappingURL=guitarra.controller.js.map