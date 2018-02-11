import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { RenameDialogComponent } from '../shared/component';

@NgModule({
  declarations: [
    AppComponent,
    RenameDialogComponent
  ],
  entryComponents: [
    RenameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollDispatchModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
