import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}

  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    this.usuarioService.crearUno({
      apellido: '...',
      fechaCreacion: new Date(),
      nombre: '...',
    });
    this.usuarioService.actualizarUno({
      id: 1,
      data: {
        nombre: '...',
        // fechaCreacion: '...',
        // fechaCreacion: new Date(),
      },
    });
    this.usuarioService.eliminarUno(1);
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }
}