var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import 'rxjs/add/operator/map';
var GetNotificationProvider = /** @class */ (function () {
    function GetNotificationProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        console.log('Hello GetNotificationProvider Provider');
    }
    GetNotificationProvider.prototype.getNotification = function () {
        var _this = this;
        this.storage.get("children").then(function (result) {
            _this.children = result;
        });
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Allow-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new RequestOptions({ headers: headers });
        this.storage.get("tags").then(function (tags) {
            console.log("tags", tags);
            $.each(tags, function (index, tag) {
                var url = "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/" + tag + "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko";
                _this.http.post(url, options).subscribe(function (data) {
                    console.log(JSON.parse(data['_body']));
                    var messages = JSON.parse(data['_body']).message;
                    _this.storage.set(tag, messages);
                    // this.storage.get("children").then((result)=>{
                    $.each(_this.children, function (i, child) {
                        if (tag == child.tag) {
                            console.log("tag = ", tag);
                            console.log("child.tag = ", child.tag);
                            if (messages.length > 0) {
                                child.lastMsg = messages[messages.length - 1];
                            }
                            else {
                                child.lastMsg = [];
                            }
                        }
                        console.log("child", child);
                    });
                    // })
                    _this.storage.set("children", _this.children);
                }, function (error) {
                    console.log(error); // Error getting the data
                });
            });
        });
    };
    GetNotificationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Storage])
    ], GetNotificationProvider);
    return GetNotificationProvider;
}());
export { GetNotificationProvider };
//# sourceMappingURL=get-notification.js.map