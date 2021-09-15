import {
  BadRequestException, Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException, Param, Post, Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }
  @Get('/html')
  @HttpCode(201)
  holaHTTP(): string {
    return '<h1>Hola HTML</h1>h1';
  }
  @Get('/json')
  @HttpCode(200)
  Holajson(): string {
    return '{mensaje: "Hola json" }';
  }

  /*--------------ERRORES----------------*/
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //  request - PETICION
    @Res() res, //  response - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', // nombre
      'Tengo hambre', // valor
    );
    res.cookie(
      'galletaSeguraYFirmada', // nombre
      'Web :3', // valor
      {
        secure: true, // solo se transfiera por canales confiables https
        signed: true, // Encriptacion
      },
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    // req.signedCookies.total
    return mensaje;
  }
  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  parametrosConsulta(
    @Query() queryParams,
    @Param() params,
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-cuerpo') // 201
  @HttpCode(200)
  parametrosCuerpo(
    @Body() bodyParams,
    @Headers() cabecerasPeticion,
  ) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }


}
