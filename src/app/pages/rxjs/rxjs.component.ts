import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // let i = -1;
    // const obs$ = new Observable<number> ( observer => {
    //   const intervalo = setInterval(()=>{
    //     i++;
    //     observer.next(i);

    //     if (i===4){
    //       clearInterval(intervalo);
    //       observer.complete();
    //     }

    //     if (i===2){
    //       i=0;
          
          
    //       observer.error(' error');
    //     }
    //   }, 1000);
    // });

    // this.retornaObservable().pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   valor => console.log('subs', valor),
    //   (err) => console.warn('Error', err),
    //   () => console.log('completado')
    //  );
    this.intervalSubs = this.retornaIntervalo()
    .subscribe(console.log);
   }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


   retornaIntervalo(): Observable<number>{
      return interval(100)
      .pipe(        
        map(valor =>  valor + 1),
        filter(valor =>  (valor % 2 === 0) ? true : false),
      );
   }

  ngOnInit(): void {}

  retornaObservable(): Observable<number> {

    let i = -1;
    return  new Observable<number> ( observer => {
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);

        if (i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i===2){
          i=0;
          
          
          observer.error(' error');
        }
      }, 1000);
    });

   
  }

}
