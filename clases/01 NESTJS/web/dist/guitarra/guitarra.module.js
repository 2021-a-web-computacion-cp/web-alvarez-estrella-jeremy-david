"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarraModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const guitarra_service_1 = require("./guitarra.service");
const guitarra_controller_1 = require("./guitarra.controller");
let GuitarraModule = class GuitarraModule {
};
GuitarraModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [
            guitarra_service_1.GuitarraService,
            prisma_service_1.PrismaService,
        ],
        exports: [
            guitarra_service_1.GuitarraService,
        ],
        controllers: [
            guitarra_controller_1.GuitarraController,
        ],
    })
], GuitarraModule);
exports.GuitarraModule = GuitarraModule;
//# sourceMappingURL=guitarra.module.js.map