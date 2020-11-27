import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TortoiseHareComponent } from './components/tortoise-hare/tortoise-hare.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { LinearEquationComponent } from './components/linear-equation/linear-equation.component';

@NgModule({
  declarations: [AppComponent, TortoiseHareComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'tortoise-hare',
        component: TortoiseHareComponent,
      },
      {
        path: 'linear-inequality',
        component: LinearEquationComponent,
      },
      {
        path: '',
        redirectTo: 'tortoise-hare',
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
