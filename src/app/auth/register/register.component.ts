import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({

    nombre: ['Fernando', [Validators.required]],
    email: ['tt@gmail.es', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true,Validators.required]
  },{validators: this.passwordIguales('password','password2')});

  constructor(private router:Router, private fb: FormBuilder, private usuarioService: UsuarioService) {

    
   }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(resp => {
      this.router.navigateByUrl('/');
    },(err)=>{
        Swal.fire('Error', err.error.msg,'error');
    });
  }

  campoNoValido(campo: string ): boolean{

    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }
    else {
      return false;
    }
 }
 aceptarTerminos(){
   return !this.registerForm.get('terminos').value && this.formSubmitted;
 }

 contrasenasNoValidas() {
   const pass1 = this.registerForm.get('password').value;
   const pass2 = this.registerForm.get('password2').value;

   if (pass1!==pass2 && this.formSubmitted){
     return true;
   }
   else {
     return false;
   }


 }

 passwordIguales(pass1: string, pass2:string){
  return (formGroup: FormGroup) => {

      const pass1control = formGroup.get(pass1);
      const pass2control = formGroup.get(pass2);
      if (pass1control.value === pass2control.value){
        pass2control.setErrors(null);
      }
      else {
        pass2control.setErrors({noEsIgual: true});
      }
  }
 }

}
