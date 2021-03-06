import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlService } from './form-factory/form-control.service';
import { ValidationFactory } from './form-factory/validation.factory';
import { FormBuilder } from '@angular/forms';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { OwlCarouselComponent } from '../components/owl-carousel';
import { HistoricalValueDirective } from './directives/historical-value-directive';
import { HistoricalDataService } from './services/historical-data-service.mock';
import { HistoricalFieldHelperService } from './services/historical-field-helper-service';
import { SelectModule } from '../components/select';
import { AfeNgSelectComponent } from '../components/afe-ng-select.component';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SelectModule],
    declarations: [FormRendererComponent, OwlCarouselComponent, AfeNgSelectComponent, HistoricalValueDirective],
    providers: [FormBuilder, FormControlService, ValidationFactory, HistoricalDataService, HistoricalFieldHelperService],
    exports: [FormRendererComponent]
})
export class FormEntryModule {

    constructor(public appRef: ApplicationRef) {

    }
    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
