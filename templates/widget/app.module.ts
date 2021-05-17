/** @format */

import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as NgRouterModule } from "@angular/router";
import { UpgradeModule as NgUpgradeModule } from "@angular/upgrade/static";
import { CoreModule, HOOK_COMPONENTS, RouterModule } from "@c8y/ngx-components";
import { DashboardUpgradeModule, UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from "@c8y/ngx-components/upgrade";
import { AssetsNavigatorModule } from "@c8y/ngx-components/assets-navigator";
import { CockpitDashboardModule } from "@c8y/ngx-components/context-dashboard";
import { ReportsModule } from "@c8y/ngx-components/reports";
import { SensorPhoneModule } from "@c8y/ngx-components/sensor-phone";
import { __CLASSNAME__Config } from "./src/__DASHEDNAME__/__DASHEDNAME__.config.component";
import { __CLASSNAME__ } from "./src/__DASHEDNAME__/__DASHEDNAME__.component";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(),
        NgRouterModule.forRoot([...UPGRADE_ROUTES], { enableTracing: false, useHash: true }),
        CoreModule.forRoot(),
        AssetsNavigatorModule,
        ReportsModule,
        NgUpgradeModule,
        DashboardUpgradeModule,
        CockpitDashboardModule,
        SensorPhoneModule,
        UpgradeModule,
    ],
    declarations: [__CLASSNAME__, __CLASSNAME__Config],
    entryComponents: [__CLASSNAME__, __CLASSNAME__Config],
    providers: [
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: [
                {
                    id: "com.softwareag.globalpresales.__DOTTEDNAME__",
                    label: "__CLASSNAME__",
                    description: "Description of __CLASSNAME__ widget",
                    component: __CLASSNAME__,
                    configComponent: __CLASSNAME__Config,
                    previewImage: require("./assets/img-preview.png"),
                    data: {
                        ng1: {
                            options: {
                                noDeviceTarget: false,
                                noNewWidgets: false,
                                deviceTargetNotRequired: false,
                                groupsSelectable: true
                            },
                        }
                    }
                },
            ],
        },

    ],
})
export class AppModule extends HybridAppModule {
    constructor(protected upgrade: NgUpgradeModule) {
        super();
    }
}
