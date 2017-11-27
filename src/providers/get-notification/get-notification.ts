import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import * as $ from 'jquery';
import 'rxjs/add/operator/map';


@Injectable()
export class GetNotificationProvider {
	children: any;

	constructor(public http: Http, private storage: Storage) {
		console.log('Hello GetNotificationProvider Provider');
	}


	getNotification(token){

		let dfd = $.Deferred();
		this.storage.get("children").then((result)=>{
        	this.children = result;
        })

        // if (sid == '') {
        	this.storage.get("tags").then((tags)=>{
				console.log("tags", tags)
				$.each(tags, (index, tag)=>{
					console.log("tag", tag)
					let settings = {
						"async": true,
						"crossDomain": true,
						// "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+tag+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko",
						"url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+tag+"?token="+token,
						"method": "POST",
						"headers": {
							"cache-control": "no-cache",
							"postman-token": "0de21fdb-9125-bb9b-15bd-e4fb1736e465",
						    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
					        "Access-Control-Allow-Origin":"*",
					        "Allow-Control-Allow-Origin":"*"
						}
					}
					$.ajax(settings).done((response)=> {
						if(response.success)
				      	{
				      		let messages = response.message;
				      		this.storage.set(tag, messages);
				      		$.each(this.children, (i, child)=>{
			            		if (tag == child.tag) {
			            			if (messages.length > 0) {
			            				child.lastMsg = messages[messages.length - 1];
			            			}
			            			else{
			            				child.lastMsg = [];
			            			}
			            		}
			            	})
			            	this.storage.set("children", this.children);
					    	dfd.resolve(this.children);
				      	}
				      	else{
				       		// alert("children not allowed")
				       		dfd.reject("children not allowed")
				      	}
					}).fail((error) => {
						dfd.reject(error)
					});
				})
			})
   //      }
   //      else{
   //      	let settings = {
			// 	"async": true,
			// 	"crossDomain": true,
			// 	"url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+sid+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko",
			// 	// "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+sid+"?token="+token,
			// 	"method": "POST",
			// 	"headers": {
			// 		"cache-control": "no-cache",
			// 		"postman-token": "0de21fdb-9125-bb9b-15bd-e4fb1736e465",
			// 	    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
			//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
			//         "Access-Control-Allow-Origin":"*",
			//         "Allow-Control-Allow-Origin":"*"
			// 	}
			// }
			// $.ajax(settings).done((response)=> {
			// 	if(response.success)
		 //      	{
		 //      		let messages = response.message;
		 //      		this.storage.set(sid, messages);
		 //      		$.each(this.children, (i, child)=>{
	  //           		if (sid == child.tag) {
	  //           			if (messages.length > 0) {
	  //           				child.lastMsg = messages[messages.length - 1];
	  //           			}
	  //           			else{
	  //           				child.lastMsg = [];
	  //           			}
	  //           		}
	  //           	})
	  //           	this.storage.set("children", this.children);
			//     	dfd.resolve(this.children);
		 //      	}
		 //      	else{
		 //       		// alert("children not allowed")
		 //       		dfd.reject("children not allowed")
		 //      	}
			// }).fail((error) => {
			// 	dfd.reject(error)
			// });
   //      }
		return dfd.promise();

	      
	}

}
