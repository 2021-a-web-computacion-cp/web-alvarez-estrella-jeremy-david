import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
}
