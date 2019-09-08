import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-server',
  templateUrl: './my-server.component.html',
  styleUrls: ['./my-server.component.css']
})
export class MyServerComponent implements OnInit {
  serverId = 30;
  serverStatus = 'offline';
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  ngOnInit() {
  }

  getServerStatus(): string {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

}
