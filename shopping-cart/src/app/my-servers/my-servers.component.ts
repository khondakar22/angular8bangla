import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-servers',
  // tslint:disable-next-line:component-selector
  // selector: '[app-my-servers]',
  templateUrl: './my-servers.component.html',
  styleUrls: ['./my-servers.component.css']
})
export class MyServersComponent implements OnInit {
  allowNewserver = false;
  serverCreationStatus = 'No server is created!';
  serverName = '';
  serverCreated = false;
  servers = ['TestServer', 'TestServer2'];
  constructor() {
    setTimeout(() => {
      this.allowNewserver = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created!' + this.serverName;
  }
  onUpdateServerName(event: Event) {
      this.serverName = (event.target as HTMLInputElement).value;
  }
}
