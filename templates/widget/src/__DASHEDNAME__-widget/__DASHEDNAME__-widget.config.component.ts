/*
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
 */
import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import * as _ from 'lodash';

@Component({
    selector: '__DASHEDNAME__-widget-config-component',
    templateUrl: './__DASHEDNAME__-widget.config.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class __CLASSNAME__WidgetConfig implements OnInit {

    @Input() config: any = {};

    __CLASSNAME__Config = {
        __CLASSNAME__Value: ''
    };

    ngOnInit(): void {
        this.initConfig();
    }

    private initConfig(): void {
        if (!this.config) {
            return;
        }

        if (_.has(this.config, "__CLASSNAME__Config")) {
            this.__CLASSNAME__Config = _.get(this.config, "__CLASSNAME__Config");
        }}

    onConfigChanged($event: Event): void {
        if (!this.__CLASSNAME__Config.__CLASSNAME__Value) {
            return;
        }
        _.set(this.config, "__CLASSNAME__Config", { ...this.__CLASSNAME__Config });
    }
}