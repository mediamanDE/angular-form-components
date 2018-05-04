import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './radio-button/radio-button-group.component';
import { ToggleComponent } from './toggle/toggle.component';
import { XsrfAppLoadService } from './csrf/xsrf-app-load.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XsrfInterceptor } from './csrf/xsrf.interceptor';
import { HttpClientModule } from '@angular/common/http';

let xsrfApiUrl: string;

/**
 * App initializer
 *
 * @param appLoadService
 */
export function initApp(appLoadService: XsrfAppLoadService) {
    return () => appLoadService.initializeApp(xsrfApiUrl);
}

@NgModule({
    declarations: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        ToggleComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule
    ],
    exports: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        ToggleComponent
    ]
})
export class AngularFormComponentsModule {
    public static forRoot(config: any): ModuleWithProviders {
        let providers: any[] = [];

        if (config.xsrfApiUrl) {
            xsrfApiUrl = config.xsrfApiUrl;
            providers = [
                XsrfAppLoadService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: initApp,
                    deps: [XsrfAppLoadService],
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: XsrfInterceptor,
                    multi: true
                }
            ];
        }

        return {
            ngModule: AngularFormComponentsModule,
            providers
        };
    }
}
