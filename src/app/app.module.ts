import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { scrollFactory, SelectOptionsGroupsComponent } from './components/select-options-groups/select-options-groups.component';
import { DemoMaterialModule } from 'src/modules/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { Overlay } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    SelectOptionsGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    // { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
    SelectOptionsGroupsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
