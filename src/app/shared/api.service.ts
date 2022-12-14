import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Navigation } from "@angular/router";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Guid } from 'guid-typescript';

@Injectable()
export class ApiService {
    env = environment;

    constructor(
        private http: HttpClient
    ) {
    }

    getHeader(): HttpHeaders {
        return localStorage.getItem('accessToken') && localStorage.getItem('userId') ? new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'id': localStorage.getItem('userId'),
            "Authorization": "Bearer " + localStorage.getItem('accessToken')
        }) : new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'Content-Type': 'application/json'
        });
    }

    signIn(item) {
        return this.http.post(environment.api + 'api/users/sign-in', item, { headers: this.getHeader() });
    }

    changePassword(item: any): Observable<any> {
        return this.http.post<any>(`${environment.api}api/users/change-password`, item);
    }

    getItem(model) {
        return this.http.get<any>(environment.api + 'api/' + model, { headers: this.getHeader() });
    }

    getUsersFilter(distance, lat, lon) {
        return this.http.get<any>(environment.api + 'api/users/filter/' + distance + '/' + lat + '/' + lon, { headers: this.getHeader() });
    }

    getUsersList(distance, userTypeIds, vibe, quality, price, lat, lon, startIndex, orderBy) {
        return this.http.get<any>(environment.api + 'api/users/list/' + distance + '/' + userTypeIds + '/' + vibe + '/' + quality + '/' + price + '/' + lat + '/' + lon + '/' + startIndex + '/' + orderBy, { headers: this.getHeader() });
    }

    getUsersCount(distance, userTypeIds, vibe, quality, price, lat, lon) {
        return this.http.get<any>(environment.api + 'api/users/count/' + distance + '/' + userTypeIds + '/' + vibe + '/' + quality + '/' + price + '/' + lat + '/' + lon, { headers: this.getHeader() });
    }

    getUsersListUnrated(distance, userTypeIds, lat, lon, startIndex, orderBy) {
        return this.http.get<any>(environment.api + 'api/users/list/unrated/' + distance + '/' + userTypeIds + '/' + lat + '/' + lon + '/' + startIndex + '/' + orderBy, { headers: this.getHeader() });
    }

    getUsersCountUnrated(distance, userTypeIds, lat, lon) {
        return this.http.get<any>(environment.api + 'api/users/count/unrated/' + distance + '/' + userTypeIds + '/' + lat + '/' + lon, { headers: this.getHeader() });
    }

    getReviewByUrlImage(urlImage) {
        return this.http.get<any>(environment.api + 'api/reviews/details/' + urlImage, { headers: this.getHeader() });
    }

    getReviewsByUserId(userId) {
        return this.http.get<any>(environment.api + 'api/reviews/user/' + userId, { headers: this.getHeader() });
    }

    getNavigation() {
        return this.http.get<Navigation>(environment.api + 'api/navigation', { headers: this.getHeader() });
    }

    upload(model, formData, filename) {
        return this.http.post(environment.api + 'api/' + model + '/uploadImage/' + filename, formData, { reportProgress: true, observe: 'events' });
    }


    getItems(model: string): Observable<any[]> {
        return this.http.get<any[]>(`${environment.api}api/` + model, { headers: this.getHeader() });
    }

    saveItem(model: string, item: any): Observable<any> {
        console.log(this.getHeader());
        return this.http.post<any>(`${environment.api}api/` + model, item, { headers: this.getHeader() });
    }

    updateItem(model: string, item: any): Observable<any> {
        return this.http.put<any>(`${environment.api}api/` + model, item, { headers: this.getHeader() });
    }

    deleteItem(model: string, id: Guid) {
        return this.http.delete<any>(`${environment.api}api/` + model + `/${id}`, { headers: this.getHeader() });
    }
}