import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyServerComponent } from './my-server/my-server.component';
import { MyServersComponent } from './my-servers/my-servers.component';

@NgModule({
  declarations: [
    AppComponent,
    MyServerComponent,
    MyServersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
