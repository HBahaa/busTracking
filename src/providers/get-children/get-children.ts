import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import 'rxjs/add/operator/map';


@Injectable()
export class GetChildrenProvider {
	children: any = [];
	rooms: any = [];

	constructor(public http: Http, private storage: Storage) {
		console.log('Hello GetChildrenProvider Provider');
	}


	getAllChildren(token){
		return new Promise((resolve) => {

			var settings = {
			  "async": true,
			  "crossDomain": true,
			  // "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/children?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko",
			  "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/children?token="+token,
			  "method": "POST",
			  "headers": {
			    "content-type": "application/json",
			    "cache-control": "no-cache",
			    "postman-token": "4935ed16-98ed-c035-1572-aeb484e2838a",
			    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
		        "Access-Control-Allow-Origin":"*",
		        "Allow-Control-Allow-Origin":"*"
			  }
			}
			
			$.ajax(settings).done((response)=> {
			  	if(response.success)
		      	{
		    		$.each(response.data, (index, value)=>{
				   		value["tag"] = index;
				   		this.rooms.push(index);
				   		this.rooms.push(value.bus_id);
				   		this.children.push(value);
						this.storage.set("rooms", this.rooms);
						this.storage.set("children", this.children);
			        });
			        resolve(true);
		      	}
		      	else{
		       		alert("Not allowed to access children");
		       		resolve(false);
		      	}
			}).fail((err)=>{
				alert("error in getting children")
				resolve(false);
			});

		});
	}

}
