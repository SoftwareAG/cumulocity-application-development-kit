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
import {__NAME__Widget} from "./src/weather-forecast-widget/weather-forecast-widget.component";
import {__NAME__WidgetConfig} from "./src/weather-forecast-widget/weather-forecast-widget.config.component";

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
  declarations: [__NAME__Widget, __NAME__WidgetConfig],
  entryComponents: [__NAME__Widget, __NAME__WidgetConfig],
  providers: [{
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: [
      {
        id: 'global.presales.__NAME__.widget',
        label: '__NAME__',
        description: '__NAME__',
        component: __NAME__Widget,
        configComponent: __NAME__WidgetConfig,
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
