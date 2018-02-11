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
  MatDialogModule,
  MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { RunnerComponent } from './runner/runner.component';

import {
  RenameDialogComponent,
  DurationPipe
} from '../shared';

@NgModule({
  declarations: [
    AppComponent,
    RenameDialogComponent,
    RunnerComponent,
    DurationPipe
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
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
