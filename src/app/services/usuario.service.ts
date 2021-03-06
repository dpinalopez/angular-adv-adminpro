import { Injectable, NgZone } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { RegisterForm } from '../Interfaces/register-form-interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../Interfaces/login-form.interface';
const base_url = environment.base_url;
import {tap, takeLast, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { SyncAsync } from '@angular/compiler/src/util';
import { Usuario } from '../models/usuario.model';


declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone ) { 

    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }


  get uid(): string{
    return this.usuario.uid || '';
  }
  googleInit(){

    return new Promise(resolve=>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '166154555955-285fo5tnt283uhkgfotc1u50mac2b9ko.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve();
      });
    });
  }
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any)=>{
 
        const {email, google,  nombre, role, img, uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);        
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        }
      )
    );
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}){

      data = {
        ...data,
        role: this.usuario.role
      }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,
        {
          headers: {
            'x-token': this.token
          }
        });
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        
        }
      )
    );
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        
        }
      )
    );
  }


  logOut(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }

}
