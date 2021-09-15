import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser'); // Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); // Servidor Web Estatico
  app.use(cookieParser('Me agradan los poliperros')); // Secreto Cookies
  app.use(// Session
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000); // PUERTO
  // package.json
  // npm run start
}
bootstrap();
/*
abstract class Nombre {
  public nombrePropiedad?: string; // undefined
  private apellidoPropiedad: string = 'Eguez';
  protected edad = 1;
  static comun: number =10;
  propiedadPublica: String;
  constructor(
    propiedadPublicaParametro: string, //parametro
    public propiedadRapido: string, //trasforma una propiedad
  ) {
    this.propiedadPublica = propiedadPublicaParametro;
    this.propiedadRapido;
  }



}

//VARIABLES PRIMITIVAS
//TIPOS DE VARIABLES

//MUTABLES -> asignar
var variableUno = 1;
let variableDos = 2;
variableUno = 3;
variableDos = 4;

//INMUTABLES -> no se pueden asignar
const variabletres = 5;

//variabletras = 2 -> ERROR

//PRIMITIVAS PRIMITIVAS
const texto: string = '';
const numeroEntero: number = 1;
const foltante: number = 1.2;
const soyEstudiante: boolean = true;
const noDefinido = undefined;
const nada = null;
const fecha: Date = new Date();
//Duck Typing
const textoDos = 'Jeremy';
let cualquiera: any = 'Jeremy';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario {

  constructor(
    public nombre: string,
    public apellido: string
  ){

  }
}

const unsuario: Usuario = new Usuario(nombre:'Jeremy', apellido: 'Alvarez');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre:string;
  apellido:string;
  edad?: number; //? => Opcional // valor por defecto -> undefined
}

let objetoUsuario: UsuarioInterface = {
  nombre: 'Jeremy';
};

objetoUusario.nombre;
console.log(usuario);

let edadAntigua = 22;
let otraEdad = edadAntigua;
edadAntigua += 1;
otraEdad -= 1;

let objetoEdad = {
  edad:22,
};

let otraEdadOnjeto = objetoEdad;
otraEdadObjeto.edad = otraEdadObjeto.edad +1; //23
console.log(otraEdadObjeto.edad);
objetoEdad.edad; //23
objetoEdad.edad = objetoEdad.edad + 1; //24
otraEdadObjeto.edad; //24
let otraEdadObjetoClonado = {...objetoEdad}; //clonacion
const arregloEjemplo = [1,2,3];
let arregloClonado = [...arregloEjemplo];

//Arreglos
const arreglo = [1, '', true, null, new Date()];
const numeros: number[] = [1,2,3,4,5];

function funcionConNombre(){}

const indice = numeros.findIndex(
  (numero: number) => {//funcion anonima
    const igualAtres: boolean = numero === 3;
    return igualAtres
  },
);

numeros[indice] =6
//agragr al final
numeros.push(6)
//agregar al principio
numeros.unshift(0);

//condiciones -> truty y Falsy
if(0){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(1){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(-1){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(""){
  console.log('Truty');//Falsy
}else{
  console.log('Falsy');
}

if("a"){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if({}){
  console.log('Truty');//Falsy
}else{
  console.log('Falsy');
}

if({a:1}){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if([]){
  console.log('Truty');//Falsy
}else{
  console.log('Falsy');
}

if([1]){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(null){
  console.log('Truty');
}else{
  console.log('Falsy');
}

if(undefined){
  console.log('Truty');
}else{
  console.log('Falsy');
}
*/
