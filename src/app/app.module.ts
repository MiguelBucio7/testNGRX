import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableClientsComponent } from './pages/table-clients/table-clients.component';
import { PrimeModule } from './prime.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientService } from './services/clientservice';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { TodosEffects } from './state/effects/todo.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PrimeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableClientsComponent,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([TodosEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration(),
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
