import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso} from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from 'src/app/share/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  uiSubscription: Subscription;
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
      this.ingresoForm = this.fb.group({
        descripcion: ['', Validators.required],
        monto: ['', Validators.required],
      });

      this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe();
  }

  guardar(){
    
    console.log('vamos a guardar');
    if ( this.ingresoForm.invalid) {return; }
    this.store.dispatch( ui.isLoading());
        
    const {descripcion, monto} = this.ingresoForm.value;
    console.log('creamos objeto para guardar');
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    console.log('llamamos a crear IngresoEgreso');
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() =>{
      this.store.dispatch( ui.stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
      this.ingresoForm.reset();
    })
    .catch( err => {
      this.store.dispatch( ui.stopLoading());
      Swal.fire('Error', err.message, 'error');
    });
  }


}

