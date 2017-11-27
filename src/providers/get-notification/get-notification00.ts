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


	getNotification(){
		return new Promise((resolve) => {

			this.storage.get("children").then((result)=>{
	        	this.children = result;
	        })

			var headers = new Headers();
		    headers.append("Accept", 'application/json');
		    headers.append('Content-Type', 'application/json' );
		    headers.append('Allow-Control-Allow-Origin', '*' );
		    headers.append('Access-Control-Allow-Origin', '*' );
		    let options = new RequestOptions({ headers: headers });

			this.storage.get("tags").then((tags)=>{
				console.log("tags", tags)
				$.each(tags, (index, tag)=>{

					let url = "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+tag+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko";
		    
		    		this.http.post(url, options).subscribe(data => {
	                        console.log(JSON.parse(data['_body']));
	                        let messages = JSON.parse(data['_body']).message
	                        this.storage.set(tag, messages);
	                        // this.storage.get("children").then((result)=>{
	                        	$.each(this.children, (i, child)=>{
	                        		if (tag == child.tag) {
	                        			console.log("tag = ", tag)
	                        			console.log("child.tag = ", child.tag)
	                        			if (messages.length > 0) {
	                        				child.lastMsg = messages[messages.length - 1];
	                        			}
	                        			else{
	                        				child.lastMsg = [];
	                        			}
	                        			
	                        		}
	                        		console.log("child", child)
	                        	})
	                        // })
	                        this.storage.set("children", this.children);
	                        resolve(true);
	                }, error => {
	                    console.log(error);// Error getting the data
	                    resolve(false);
	                });

				}).fail((error)=>{
					resolve(false);
				})
			})

		});
	      
	}

}
