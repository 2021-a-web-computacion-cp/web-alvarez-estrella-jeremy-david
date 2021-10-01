import { GuitarraService } from './guitarra.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException, Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { GuitarraCrearDto } from './dto/guitarra-crear.dto';
import { validate } from 'class-validator';
import { stringify } from 'ts-jest/dist/utils/json';
import { GuitarraActualizarDto } from './dto/guitarra-actualizar.dto';

// http://localhost:3000/usuario/......
@Controller('guitarra')
export class GuitarraController {
  constructor(
    // Inyeccion dependencias
    private guitarraService: GuitarraService,
  ) {  }

  @Get('lista-guitarras')
  async listaGuitarras(@Res() response, @Query() parametrosConsulta) {
    try {
      // validar parametros de consulta con un dto
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
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get('crear-guitarra')
  crearGuitarra(@Res() response, @Query() parametrosConsulta) {
    response.render('guitarra/crearguitarra', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }


  @Post('crear-guitarra-form')
  async crearGuitarraForm(@Res() response, @Body() parametrosCuerpo) {

    const guitarraCrearDto = new GuitarraCrearDto();
    guitarraCrearDto.nombre = parametrosCuerpo.nombre;
    guitarraCrearDto.fechaLlegada = new Date(parametrosCuerpo.fechaLlegada);

    guitarraCrearDto.puenteFlotante = !!(parametrosCuerpo.puenteFlotante);
    guitarraCrearDto.precio = parseFloat(parametrosCuerpo.precio);
    console.log(guitarraCrearDto.puenteFlotante);
    try {

      const errores = await validate(guitarraCrearDto);
      console.log(errores);
      if (errores.length > 0 ) {
        response.redirect(
          '/guitarra/crear-guitarra' +
          '?mensaje= Datos mal ingresados, intente de nuevo'
        );
        console.log(JSON,stringify(errores));
        throw new BadRequestException('No envia bien parametros: ');

      } else {
        await this.guitarraService.crearUno(guitarraCrearDto);
        response.redirect(
          '/guitarra/crear-guitarra' +
          '?mensaje= Se ha creado la guitarra ' +
          parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando guitarra');

    }
  }

  @Post('eliminar-guitarra/:idguitarra')
  async eliminarguitarra(@Res() response, @Param() parametrosRuta) {
    try {
      await this.guitarraService.eliminarUno(+parametrosRuta.idguitarra);
      response.redirect(
        '/guitarra/lista-guitarras' + '?mensaje=Se elimino la guitarra',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }

  @Post('actualizar-guitarra/:idguitarra')
  async obtenerUno(@Res() response,  @Param() parametrosRuta) {
    try {
      const respuesta = await this.guitarraService.buscarUno(+parametrosRuta.idguitarra);
      console.log("-----------------------------")
      console.log(respuesta)
      response.render('guitarra/actualizarguitarra', {
        datos: {
          guitarras: respuesta,
        },

      });

    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Error')
    }
  }


  @Post('actualizar-guitarra-form/:idguitarra')
  async actualizarGuitarraForm(
    @Res() response,
    @Body() parametrosCuerpo,
    @Param() parametrosRuta,
  ) {

    const guitarraActualizarDto = new GuitarraActualizarDto();
    guitarraActualizarDto.nombre = parametrosCuerpo.nombre;
    guitarraActualizarDto.fechaLlegada = new Date(parametrosCuerpo.fechaLlegada);
    guitarraActualizarDto.puenteFlotante = !!(parametrosCuerpo.puenteFlotante);
    guitarraActualizarDto.precio = parseFloat(parametrosCuerpo.precio);
    try {
      const errores = await validate(guitarraActualizarDto);

      if (errores.length > 0) {
        response.redirect(
          '/guitarra/lista-guitarras' +
          '?mensaje=No se pudo actualizar los datos de la guitarra, intente de nuevo'
        );
        console.log(JSON,stringify(errores));
        throw new BadRequestException('No envia bien parametros: ');


      } else {
        await this.guitarraService.actualizarUno({
          id: +parametrosRuta.idguitarra,
          data: guitarraActualizarDto,
        });
        response.redirect(
          '/guitarra/lista-guitarras' +
          '?mensaje= Se actualizo correctamente la guitarra ' +
          parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('Error actualizando guitarra');
    }
  }

}