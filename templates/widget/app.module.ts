import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as NgRouterModule } from '@angular/router';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import {
  DashboardUpgradeModule,
  UpgradeModule,
  HybridAppModule,
  UPGRADE_ROUTES
} from '@c8y/ngx-components/upgrade';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { CockpitDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ReportsModule } from '@c8y/ngx-components/reports';
import { SensorPhoneModule } from '@c8y/ngx-components/sensor-phone';
import {__CLASSNAME__Widget} from "./src/__DASHEDNAME__-widget/__DASHEDNAME__-widget.component";
import {__CLASSNAME__WidgetConfig} from "./src/__DASHEDNAME__-widget/__DASHEDNAME__-widget.config.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgRouterModule.forRoot([...UPGRADE_ROUTES], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    AssetsNavigatorModule,
    ReportsModule,
    NgUpgradeModule,
    DashboardUpgradeModule,
    CockpitDashboardModule,
    SensorPhoneModule,
    UpgradeModule
  ],
  declarations: [__CLASSNAME__Widget, __CLASSNAME__WidgetConfig],
  entryComponents: [__CLASSNAME__Widget, __CLASSNAME__WidgetConfig],
  providers: [{
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: [
      {
        id: 'global.presales.__CLASSNAME__.widget',
        label: '__CLASSNAME__',
        description: '__CLASSNAME__',
        component: __CLASSNAME__Widget,
        configComponent: __CLASSNAME__WidgetConfig,
        previewImage: require("./styles/previewImage.png")
      }
    ]
  }],
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
