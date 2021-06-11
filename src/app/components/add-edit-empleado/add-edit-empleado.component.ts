import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadosCiviles: any[] = [
    'Soltero', 'Casado', 'Divorsiado'
  ];
  idEmpleado : any;
  accion = 'Crear';
  myForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService,
    private route: Router, private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(30)]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['',Validators.required],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required]
    });
    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idEmpleado !== undefined){
      this.accion = 'Editar'
      this.obtenerEmpleado();
    }
  }

  guardarEmpleado() {
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      telefono: this.myForm.get('telefono').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value
    }
    if(this.idEmpleado !== undefined){
      this._empleadoService.editEmpleado(empleado, this.idEmpleado);
      this.openSnackBar('Empleado editado correctamente!');
    } else {
      this._empleadoService.agregarEmpleado(empleado);
      this.openSnackBar('Empleado agregado correctamente!');
    }
    this.route.navigate(['/']);
  }

  obtenerEmpleado(){
    const empleado: Empleado = this._empleadoService.getEmpleado(this.idEmpleado);
    console.log(empleado);
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      telefono: empleado.telefono,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo
    });
    console.log(this.myForm)
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
