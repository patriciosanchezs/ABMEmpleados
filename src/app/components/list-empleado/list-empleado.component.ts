import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';



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
  constructor(private _empleadoService: EmpleadoService) {
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
    this._empleadoService.eliminarEmpleado(index);
    this.cargarEmpleados();
  }
}
