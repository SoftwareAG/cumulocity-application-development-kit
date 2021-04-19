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

import { Component, Input, OnDestroy } from "@angular/core";
import { Realtime, InventoryService } from "@c8y/client";
@Component({
    selector: "lib-__DASHEDNAME__-widget",
    templateUrl: "./__DASHEDNAME__-widget.component.html",
    styleUrls: ["./__DASHEDNAME__-widget.component.css"],
})
export class __CLASSNAME__Widget implements OnDestroy {
    widgetConfiguration: any;

    @Input() set config(newConfig: any) {
        this.widgetConfiguration = newConfig;
    }

    constructor(private realtime: Realtime, private invSvc: InventoryService) {}

    ngOnDestroy(): void {}
}
