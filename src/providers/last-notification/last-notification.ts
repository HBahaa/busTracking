import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';


@Injectable()
export class LastNotificationProvider {

  constructor(private storage: Storage) {
    console.log('Hello LastNotificationProvider Provider');
  }


  getLastNotification(tag, token){
  	return new Promise((resolve) => {
	  	var settings = {
		  "async": true,
		  "crossDomain": true,
		  // "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+tag+"/1/0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko",
		  "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+tag+"/1/0?token="+token,
		  "method": "POST",
		  "headers": {
		    "cache-control": "no-cache",
		    "postman-token": "169ca184-9baa-904b-e7ff-b29fd3dbcaba",
		    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
	        "Access-Control-Allow-Origin":"*",
	        "Allow-Control-Allow-Origin":"*"
		  }
		}

		$.ajax(settings).done(function (response) {
			if (response.success) {
				this.storage.get("children").then((data)=>{
					$.each(data, (index, child)=>{
						if(child.tag == tag){
							if (response["message"].length > 0) {
								child["lastMsg"] = response["message"][0]
							}else{
								child["lastMsg"] = []
							}
						}
					})
					this.storage.set("children", data);
					resolve(true);
				}).catch((arr)=>{
					resolve(false);
					// alert("error getting last notification")
				})
			}
		}).fail((error)=>{
			// alert("fail to get last notification")
			resolve(false);
		});
	});
  }

}
