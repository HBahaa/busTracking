import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import 'rxjs/add/operator/map';


@Injectable()
export class GetNotificationProvider {

	constructor(public http: Http) {
	console.log('Hello GetNotificationProvider Provider');
	}


	getNotification(sid, token){

		// let dfd = $.Deferred();

		// let settings = {
		// 	"async": true,
		// 	"crossDomain": true,
		// 	"url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+sid+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko",				"method": "POST",
		// 	"headers": {
		// 		"cache-control": "no-cache",
		// 		"postman-token": "0de21fdb-9125-bb9b-15bd-e4fb1736e465",
		// 	    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
		//         "Access-Control-Allow-Origin":"*",
		//         "Allow-Control-Allow-Origin":"*"
		// 	}
		// }
		// $.ajax(settings).done(function (response) {
		// 	if(response.success)
	 //      	{
		//     	dfd.resolve(response);
	 //      	}
	 //      	else{
	 //       		// alert("children not allowed")
	 //       		dfd.reject("children not allowed")
	 //      	}
		// }).fail((error) => {
		// 	// console.log(error)
		// 	dfd.reject(error)
		// });

		// return dfd.promise();


		var headers = new Headers();
	    headers.append("Accept", 'application/json');
	    headers.append('Content-Type', 'application/json' );
	    headers.append('Allow-Control-Allow-Origin', '*' );
	    headers.append('Access-Control-Allow-Origin', '*' );
	    let options = new RequestOptions({ headers: headers });

	    let url = "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notification/"+sid+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInN0YXR1cyI6ImxvZ2dlZCIsImRhdGEiOlt7Im5hbWUiOiJIZWJhIiwicGFzcyI6IkhiMjIwOCIsImNoaWxkcmVuIjp7IjEyMjEyMjEyMiI6eyJidXMiOiJidXMgTm8uNSIsImJ1c19pZCI6IjEyMzQ1NjciLCJuYW1lIjoiRGVtbyBQYXNzZW5nZXIifSwiMTIzMTIzMTIzIjp7ImJ1cyI6ImJ1cyBOby4zIiwiYnVzX2lkIjoiMTIzNDA0MyIsIm5hbWUiOiJQYXNzZW5nZXIyIn19LCJsb2MiOnsibG9uZyI6ImZ1bmN0aW9uICgpe3JldHVybiBifSIsImxhdCI6ImZ1bmN0aW9uICgpe3JldHVybiBhfSJ9LCJuaWQiOiIxMjM0NTY3ODkwMTIzNCIsInNlY0NvZGUiOiI1ODA3MTcxNTEzNjc5OCIsInBhc3NTdGF0dXMiOiJibG9ja2VkIiwiY3JlYXRlZF9ub3RpZmljYXRpb24iOmZhbHNlLCJpZCI6IjVhMTViMTIxYzQxMjgzNTllNWVmNDYzZSJ9XSwiaWF0IjoxNTExMzc5Njc4fQ.JuJL7wU1yvTjMTey8ZchMKPjOfAGGk6__kXiqMu7Qko";
	    
	    return this.http.post(url, options)
	      
	}

}
