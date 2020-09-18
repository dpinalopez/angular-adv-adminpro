import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { escapeRegExp } from '@angular/compiler/src/util';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }


  async actualizarFoto(
    archivo: File,
    tipo: 'usuario'|'medico'|'hospitales',
    id: string)
    {
    try {
    
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData =  new FormData();
      formData.append('imagen', archivo);

        const resp = await fetch(url,{
          method:'PUT',
          headers:{
            'x-token': localStorage.getItem('token') ||  ''
          },
          body: formData
        });

        const data =await resp.json();

          if (data.ok){
            return data.nombrearchivo;
          }
          else {
            console.log(data.msg);
            
            return false;
          }
        
        
        console.log(resp);;
        return 'nombre de la imagen';
        
    } catch (error) {
      console.log(error);
      
      return false;
    }
  }
}
