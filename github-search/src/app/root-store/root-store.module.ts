import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { REDUCER_TOKEN, reducers } from './root-reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    imports: [
        StoreModule.forRoot(REDUCER_TOKEN /* default runtime checks are okay*/),
        StoreDevtoolsModule.instrument({ maxAge: false }),
        EffectsModule.forRoot([])
    ],
    providers: [
        {
            provide: REDUCER_TOKEN,
            useValue: reducers
        }
    ]
})
export class RootStoreModule {}
