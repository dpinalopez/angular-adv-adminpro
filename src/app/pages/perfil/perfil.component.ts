import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubida:File;
  public imgTemp:any=null;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private fileUploadService: FileuploadService) { 

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
     

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {

        const {nombre , email } = this.perfilForm.value;

        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado','Cambios Guardados','success');
        
    },(err)=>{
      Swal.fire('Error',err.error.msg,'error');

      
      
    }
    
    );
  }

  cambiarImagen(file: File){
    this.imagenSubida = file;

    if (!file) {
      return this.imgTemp=null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = ()=>{
      this.imgTemp=reader.result;

      
      
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubida,'usuario',this.usuario.uid)
    .then(img => {
        this.usuario.img=img;
        Swal.fire('Guardado','Cambios Guardados','success');
    }).catch(err=>{
      Swal.fire('Error','no se pudo subir la imagen','error');
    });
  }
}
