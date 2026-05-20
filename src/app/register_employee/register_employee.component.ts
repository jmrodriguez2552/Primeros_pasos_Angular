import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { Auth } from '../auth/auth';


@Component({
  selector: 'app-register_employee',
  standalone:true,
  imports:[CommonModule, FormsModule, RouterModule],
  templateUrl: './register_employee.component.html',
  styleUrls: ['./register_employee.component.css']
})
export class Register_employeeComponent{
  name = '';
  surname = '';
  email = '';
  password = '';
  rol = 'empleado';
  errorMessage = '';
  successMessage = '';

  constructor(private auth:Auth, private router:Router) {}

  onRegister(): void {
    this.errorMessage="";
    this.successMessage="";

    if (!this.name || !this.surname || !this.email || !this.password){
      this.errorMessage = "Todos los campos han de estar informados";
      return;
    }

    this.auth.register(this.name, this.surname, this.email, this.password, this.rol).subscribe({
      next: (response) => {
        this.successMessage="Empleado registrado correctamente en BD";
        // Limpiamos formulario
        this.name = ''; this.surname = ''; this.email = ''; this.password = '';
        // Redirigimos al dashboad a los dos segundos
        setTimeout(() => this.router.navigate(["/dashboard"]), 2000);
      },
      error: (err) => {
        if(err.status === 400){
          this.errorMessage="Correo electrónico ya registrado";
        }else{
          this.errorMessage="Error de conexión con BD";
        }
      }
    });
  }


}
