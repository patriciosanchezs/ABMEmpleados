import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';



@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  listEmpleados: Empleado[];

  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'correo', 'sexo', 'estadoCivil', 'fechaIngreso', 'acciones'];
  dataSource: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _empleadoService: EmpleadoService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.cargarEmpleados();
  }

  ngOnInit(): void {
    this.aplicarPaginator();
  }

  aplicarPaginator(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados(): void {
    this.listEmpleados = this._empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleados);
    this.aplicarPaginator();
    console.log(this.listEmpleados);
  }

  eliminarEmpleado(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: '¿Está seguro que desea eliminar el empleado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this._empleadoService.eliminarEmpleado(index);
        this.openSnackBar('Empleado eliminado correctamente!');
        this.cargarEmpleados();
      }
    });
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Ok', {
      duration: 30000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
