import React, { useContext } from "react";
import AuthContext from "../contexts/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HOSTWEBAPI } from '@env'

interface ApiResponse<T> {
	data?: T,
	html?: string,
	ok: boolean,
	status: number,
	statusText: string,
	errorMessage: string,
	error: Error
}

interface KeyValuePair {
	key: string;
	value: string;
}

class ApiServices {


	constructor(host: string) {
		this.host = host;
		this.headers = [];
	}

	public host: string;
	public headers: KeyValuePair[];
	

	private requestHeaders = async (needAuth: boolean = true): Promise<Headers> => {

		//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbiI6ImU2ZTlmNzgxLWRlNGQtNDExMC1iZDQ4LWVjZjQ5OGM4ZDAxMCIsIlRva2VuQnJhbmEiOiJmbGF2aW8ubWVubmVsYUBsYXVzaXYuY29tLmJyIiwibmJmIjoxNjI4ODM1ODMzLCJleHAiOjE2Mjg4Mzc2MzMsImlhdCI6MTYyODgzNTgzM30.jM9tFeVNV5K6mEC9v2b3qSX5GZ16JKq0QK5VRIQXfbc";
		const token = await AsyncStorage.getItem("Token");
		//console.log("token =>", token);
		console.log("api =>", { HOSTWEBAPI });
		let requestHeaders = new Headers();
		requestHeaders.set('Content-Type', 'application/json; charset=utf-8');
		requestHeaders.set('Accept', '*/*');
		requestHeaders.set('Access-Control-Allow-Origin', '*');
		requestHeaders.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		if (needAuth && token) requestHeaders.set('Authorization', 'Bearer ' + token);
		_apiwebService.headers.map(v => {
			requestHeaders.set(v.key, v.value);
		})
		_apiwebService.headers.length = 0;

		return requestHeaders;
	};
	public addHeader = (key: string, value: string): void => {
		_apiwebService.headers.push({ key, value });
	}

	private handleError(error: Response) {
		console.log(error);
		return error.json() || 'Server error';
	}

	private processResponse = async<T>(r: RequestInfo, o: RequestInit, needAuth: boolean = true, html: boolean = false): Promise<ApiResponse<T>> => {
		try {

			const fetchResult = await fetch(r, { ...o, headers: await _apiwebService.requestHeaders(needAuth) });
			//console.log("fetchResult =>", fetchResult)
			var result = { ok: fetchResult.ok, status: fetchResult.status, statusText: fetchResult.statusText } as ApiResponse<T>
			//console.log("result =>", result)
			//console.log("result =>", { r, result })
			if (result.ok) {
				if (html) {
					const resultHtml = await fetchResult.text();
					result.html = resultHtml;
				} else {
					const resultJson = await fetchResult.json();
					result.data = resultJson;
				}
				return result;
			}
			var resultErrorJson = await fetchResult.text();
			throw new Error(resultErrorJson);
		} catch (e) {
			var resultError = { ok: false, error: e } as ApiResponse<T>;
			console.log("resultError =>", resultError);
			return resultError;
		}
	}

	get = async <T>(endpoint: string, needAuth: boolean = true): Promise<ApiResponse<T>> => {
		return await _apiwebService.processResponse<T>(_apiwebService.host + endpoint, { }, needAuth);
	};

	getHtml = async (endpoint: string, needAuth: boolean = true): Promise<ApiResponse<string>> => {
		return await _apiwebService.processResponse<string>(_apiwebService.host + endpoint, { }, needAuth, true);
	};

	post = async <T>( endpoint: string, body: any, needAuth: boolean = true): Promise<ApiResponse<T>> => {
		return  await _apiwebService.processResponse<T>(_apiwebService.host + endpoint, {
										method: 'POST',
			body: JSON.stringify(body)	
		}, needAuth);
	};


	postHtml = async (endpoint: string, body: any, needAuth: boolean = true): Promise<ApiResponse<string>> => {
		return await _apiwebService.processResponse<string>(_apiwebService.host + endpoint, {
												method: 'POST',
			body: JSON.stringify(body)
		}, needAuth, true);
	};

	put = async <T>(endpoint: string, id: string, body: any, needAuth: boolean = true): Promise<ApiResponse<T>> => {
		return await _apiwebService.processResponse<T>(_apiwebService.host + endpoint + "/" + id, {
														method: 'PUT',
			body: JSON.stringify(body)
		});
	};

	delete = async <T>(endpoint: string, id: string, needAuth: boolean = true): Promise<ApiResponse<T>> => {
		return  await _apiwebService.processResponse<T>(_apiwebService.host + endpoint + "?id=" + id, {
																method: 'DELETE'
		}, needAuth);
	};
};

export const _apiwebService = new ApiServices(HOSTWEBAPI);

export const NewGuid = function NewGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
};
