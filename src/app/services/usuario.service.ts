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


declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  constructor(private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone ) { 

    this.googleInit();
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

    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any)=>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
          console.log(resp);
        }
      )
    );
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
          console.log(resp);
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
          console.log(resp);
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
