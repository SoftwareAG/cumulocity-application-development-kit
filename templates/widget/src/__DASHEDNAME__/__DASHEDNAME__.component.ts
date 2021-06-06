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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Realtime, InventoryService } from "@c8y/client";
import { WidgetHelper } from "./widget-helper";
import { WidgetConfig } from "./widget-config";

@Component({
    selector: "lib-__DASHEDNAME__",
    templateUrl: "./__DASHEDNAME__.component.html",
    styleUrls: ["./__DASHEDNAME__.component.css"],
})
export class __CLASSNAME__ implements OnDestroy, OnInit {

    widgetHelper: WidgetHelper<WidgetConfig>;
    @Input() config;


    constructor(private realtime: Realtime, private invSvc: InventoryService) {
    }

    async ngOnInit(): Promise<void> {
        this.widgetHelper = new WidgetHelper(this.config, WidgetConfig); //default access through here
        return;
    }

    ngOnDestroy(): void {
        //unsubscribe from observables here
    }
}
