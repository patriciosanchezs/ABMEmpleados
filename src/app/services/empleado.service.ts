import { Injectable } from '@angular/core';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  listEmpleados: Empleado[] = [
    { nombreCompleto: 'Patricio Sánchez', correo: 'patricio.sanchez@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Masculino', telefono: '+56 9 7937 7677' },
    { nombreCompleto: 'Pia Sánchez', correo: 'pia.sanchez@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 7678' },
    { nombreCompleto: 'Felipe Sánchez', correo: 'felipe.sanchez@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Masculino', telefono: '+56 9 7987 7677' },
    { nombreCompleto: 'Sandro Sánchez', correo: 'sandro.sanchez@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Masculino', telefono: '+56 9 7537 7677' },
    { nombreCompleto: 'Manuel Escobar', correo: 'manuel.escobar@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Masculino', telefono: '+56 9 7237 7677' },
    { nombreCompleto: 'Genesis Escobar', correo: 'genesis.escobar@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 3937 7677' },
    { nombreCompleto: 'Marianela Escobar', correo: 'marianela.escobar@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 1937 7677' },
    { nombreCompleto: 'Estefani Escobar', correo: 'estefani.escobar@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 6677' },
    { nombreCompleto: 'Constanza Sánchez', correo: 'constanza.sanchez@gmail.com', estadoCivil: 'Soltero', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 7777' },
    { nombreCompleto: 'Luis Suárez', correo: 'luis.suarez@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Masculino', telefono: '+56 9 7937 2345' },
    { nombreCompleto: 'Magaly Suárez', correo: 'magaly.suarez@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 1233' },
    { nombreCompleto: 'Casandra Suárez', correo: 'casandra.suarez@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 8644' },
    { nombreCompleto: 'Ximena Suárez', correo: 'ximena.suarez@gmail.com', estadoCivil: 'Casado', fechaIngreso: new Date, sexo: 'Femenino', telefono: '+56 9 7937 9642' }
  ]

  constructor() { }

  getEmpleados(): Empleado[] {
    return this.listEmpleados.slice();
  }

  eliminarEmpleado(index: number): void {
    this.listEmpleados.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado): void {
    this.listEmpleados.unshift(empleado);
  }

  getEmpleado(index: number){
    return this.listEmpleados[index];
  }

  editEmpleado(empleado: Empleado, index: number){
    this.listEmpleados[index].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleados[index].telefono = empleado.telefono;
    this.listEmpleados[index].correo = empleado.correo;
    this.listEmpleados[index].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleados[index].estadoCivil = empleado.estadoCivil;
    this.listEmpleados[index].sexo = empleado.sexo;

  }
}
