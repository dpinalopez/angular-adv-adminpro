import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.css']
})
export class NopagefoundComponent   {
  year = new Date().getFullYear();
}
