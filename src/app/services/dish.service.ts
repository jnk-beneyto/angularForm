import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish';
import { glob } from './global';


@Injectable({
  providedIn: 'root'
})

export class DishService{
    public url:string;
    constructor (private _http:HttpClient){
        this.url = glob.url;
    }

    saveDish(dish: Dish){
        let params = JSON.stringify(dish);
        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.post(this.url + 'setDish', params, {headers:headers});
    }

}