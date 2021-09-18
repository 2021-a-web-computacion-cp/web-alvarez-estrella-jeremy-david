import { Body, Controller, Get, Header, Headers,HttpCode, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('calculadora/suma')
  @HttpCode(200)
  suma(@Query() numeros,@Req() req, @Res({passthrough: true}) res){
    var resultado = Number(numeros.numero1) + Number(numeros.numero2);
    var Firmar = req.signedCookies;
    var valor = Firmar["valor"];

    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo, {signed: true,},);
      if(valor_nuevo < 0){
        res.cookie('valor', 100, {signed: true,},);
        return "El valor es menor a 0 :'v. Se reseteara el valor de la cookie a 100";
      }else{
        return "El valor de la suma es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor',100, {signed: true,},);
      res.send('Se ha creado la cookie con un valor de 100, No existían cookies anteriores'); // return de antes
    }
  }

  @Post('calculadora/resta')
  @HttpCode(201)
  @Header('Result','Value')
  restar(@Body() numero,    @Headers() headers,    @Req() req,    @Res({passthrough: true}) res  ){
    var resultado = Number(numero.numero1) - Number(numero.numero2);
    res.header("Result",resultado);
    var Firmar = req.signedCookies;
    var valor = Firmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo, {signed: true,},);
      if(valor_nuevo < 0){
        res.cookie('valor', 100, {signed: true,},);
        return "El valor es menor a 0 :'v. Se reseteara el valor de la cookie a 100";
      }else{
        return "El valor de la resta es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor', 100, {signed: true,},);
      res.send('Se ha creado la cookie con un valor de 100, No existían cookies anteriores' + valor);

    }}

  @Put('calculadora/producto/:numero1/:numero2')
  @HttpCode(200)
  producto(@Param() numeros, @Req() req, @Res({passthrough: true}) res){
    var resultado = Number(numeros.numero1) * Number(numeros.numero2);
    var Firmar = req.signedCookies;
    var valor = Firmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo, {signed: true,},);
      if(valor_nuevo < 0){
        res.cookie('valor', 100, {signed: true,},);
        return "El valor es menor a 0 :'v. Se reseteara el valor de la cookie a 100";
      }else{
        return "El valor de la multiplicacion es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor', 100, {signed: true,},);
      res.send('Se ha creado la cookie con un valor de 100, ya que no se ha encontrado una anteriormente, Intente de nuevo'); // return de antes
    }
  }

  @Put('calculadora/division')
  @HttpCode(201)
  division(@Headers() numeros, @Req() req, @Res({passthrough: true}) res){
    var resultado = Number(numeros.numero1) / Number(numeros.numero2);
    var Firmar = req.signedCookies; console.log(Firmar);
    var valor = Firmar["valor"];
    if(valor != undefined){
      var valor_nuevo = Number(valor) - resultado;
      res.cookie('valor', valor_nuevo, {signed: true,},);
      if(valor_nuevo < 0){
        res.cookie('valor', 100, {signed: true,},);
        return "El valor es menor a 0 :'v. Se reseteara el valor de la cookie a 100";
      }else{
        return "El valor de la divison es igual a " +resultado + " te quedan: " + valor_nuevo + " puntos";
      }

    }else{
      res.cookie('valor', 100, {signed: true,},);
      res.send('Se ha creado la cookie con un valor de 100, No existían cookies anteriores'); // return de antes
    }
  }
}
