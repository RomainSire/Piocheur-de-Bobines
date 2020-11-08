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
    document.getElementById('navigation').classList.add('navigation__visible');
  }
  public onCloseNav(e): void {
    e.preventDefault();
    document.getElementById('navigation').classList.remove('navigation__visible');
  }

}
