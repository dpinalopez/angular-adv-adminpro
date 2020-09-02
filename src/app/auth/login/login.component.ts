import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginForm } from '../../Interfaces/login-form.interface';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi:any;




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public auth2: any;
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || ''  , [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });
  constructor(private ngzone:NgZone, private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }


  ngOnInit(): void {

    this.renderButton();
  }


  login(){
    this.usuarioService.login(this.loginForm.value)
    .subscribe(
      resp => {
        if (this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        }
        else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/');
  }

  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   const id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
    
  // }

  //  onFailure(error) {
  //   console.log(error);
  // }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

   async startApp() {
    // gapi.load('auth2', ()=>{
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '166154555955-285fo5tnt283uhkgfotc1u50mac2b9ko.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin'
     //});
     await this.usuarioService.googleInit();
     this.auth2 = this.usuarioService.auth2;
     this.attachSignin(document.getElementById('my-signin2'));
    
    //};
  }

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(
            resp=>{

              this.ngzone.run(()=>{
                this.router.navigateByUrl('/');
              })
              
            }
            
          );
          
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
