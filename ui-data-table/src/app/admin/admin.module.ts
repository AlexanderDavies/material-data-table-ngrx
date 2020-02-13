import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserTableComponent } from './user-table/user-table.component';

import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
    AdminComponent,
    UserTableComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class AdminModule { }
