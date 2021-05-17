/**
 * /*
 * Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @format
 */

import { CoreModule, HOOK_COMPONENTS } from "@c8y/ngx-components";
import { __CLASSNAME__Config } from "./__DASHEDNAME__.config.component";
import { __CLASSNAME__ } from "./__DASHEDNAME__.component";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [CoreModule, HttpClientModule],
    declarations: [__CLASSNAME__, __CLASSNAME__Config],
    entryComponents: [__CLASSNAME__, __CLASSNAME__Config],
    providers: [
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: {
                id: "global.presales.__DOTTEDNAME__.widget",
                label: "__CLASSNAME__",
                description: "Description of __CLASSNAME__ widget",
                component: __CLASSNAME__,
                configComponent: __CLASSNAME__Config,
                previewImage: require("~assets/img-preview.png"),
                data: {
                    ng1: {
                        options: { noDeviceTarget: false, noNewWidgets: false, deviceTargetNotRequired: false, groupsSelectable: true },
                    },
                },
            },
        },
    ],
})
export class __CLASSNAME__Module {}
