import { GuitarraService } from './guitarra.service';
export declare class GuitarraController {
    private guitarraService;
    constructor(guitarraService: GuitarraService);
    listaGuitarras(response: any, parametrosConsulta: any): Promise<void>;
    crearGuitarra(response: any, parametrosConsulta: any): void;
    crearGuitarraForm(response: any, parametrosCuerpo: any): Promise<void>;
    eliminarguitarra(response: any, parametrosRuta: any): Promise<void>;
    obtenerUno(response: any, parametrosRuta: any): Promise<void>;
    actualizarGuitarraForm(response: any, parametrosCuerpo: any, parametrosRuta: any): Promise<void>;
}
