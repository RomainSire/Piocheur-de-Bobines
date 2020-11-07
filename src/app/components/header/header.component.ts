import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenNav(): void {
    document.getElementById('navigation').style.width = "100%";
  }
  public onCloseNav(): void {
    document.getElementById('navigation').style.width = "0";
    
  }

}
