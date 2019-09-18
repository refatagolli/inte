import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { FUSE_CONFIG } from '@theme/services/config.service';

@NgModule()
export class ThemeModule
{
    constructor(@Optional() @SkipSelf() parentModule: ThemeModule)
    {
        if ( parentModule )
        {
            throw new Error('ThemeModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : ThemeModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
