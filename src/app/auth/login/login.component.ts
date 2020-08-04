import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateEventsArray } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/share/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

loginForm: FormGroup;
cargando: boolean = false;
uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['' , [Validators.required, Validators.email]],
        password: ['' , Validators.required]
      });

     // tslint:disable-next-line: align
     // tslint:disable-next-line: no-shadowed-variable
     this.uiSubscription = this.store.select('ui').subscribe( ui => {
                                this.cargando = ui.isLoading;
                                console.log('cargando subs');
                              });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario (){
    if (this.loginForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());
    
    /* Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }); */

    const { email, password} = this.loginForm.value;
    this.authService.loginUsuario( email, password )
    .then( credenciales =>{
      console.log (credenciales);

     /*  Swal.close(); */

     this.store.dispatch(ui.stopLoading()); 
     this.route.navigate(['/']);
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...!',
        text: err.message
      })
    });
  }
}
