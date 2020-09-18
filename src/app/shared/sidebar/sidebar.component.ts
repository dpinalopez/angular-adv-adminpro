import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[];
  public  usuario: Usuario;
  constructor(private sideBarService: SidebarService, usuarioService: UsuarioService) { 
      this.menuItem = sideBarService.menu;
      this.usuario = usuarioService.usuario;
      
  }

  ngOnInit(): void {
  }

}
