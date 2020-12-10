import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public title: string;

  constructor() {
    this.title = "Información";
  }

  ngOnInit() {
  }

}
