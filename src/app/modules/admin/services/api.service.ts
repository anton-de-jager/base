import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Navigation } from "@angular/router";
import { environment } from "environments/environment";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
    env = environment;

    constructor(
        private http: HttpClient
    ) {
    }

    getHeaderNodeRed(): HttpHeaders {
        return localStorage.getItem('accessToken') ? new HttpHeaders({
            'Content-Type': 'application/json',
            'id': localStorage.getItem('userId'),
            'token': localStorage.getItem('accessToken')
        }) : new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    getHeader(): HttpHeaders {
        return localStorage.getItem('accessToken') ? new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'id': localStorage.getItem('userId'),
            "Authorization": "Bearer " + localStorage.getItem('accessToken')
        }) : new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    getHeaderPayfast(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
        });
    }

    actionItem(actionTable: string, action: string, item: any) {
        item.actionTable = actionTable;
        item.action = action;
        return this.http.post(this.env.apiUrl + 'action', item, { headers: this.getHeaderNodeRed() });
    }

    get(controller: string) {
        return this.http.get(environment.api + 'api/' + controller, { headers: this.getHeaderNodeRed() });
    }

    getById(controller: string, id: Guid) {
        return this.http.get(environment.api + 'api/' + controller + '/' + id, { headers: this.getHeaderNodeRed() });
    }

    post(controller: string, tag: string, data: any) {
        if ((controller === 'directories' && tag === 'category') || (controller === 'status' && tag === 'table')) {
            return this.http.post(environment.api + 'api/' + controller + '/' + tag + '/' + data, data, { headers: this.getHeaderNodeRed() });
        } else {
            return this.http.post(environment.api + 'api/' + controller + (tag ? '/' + tag : ''), data, { headers: this.getHeaderNodeRed() });
        }
    }

    getDirectories(categoryId: Guid, startIndex: number) {
        return this.http.post(environment.api + 'api/directories/category/' + categoryId + '/' + startIndex, { directoryCategoryId: categoryId, startIndex: startIndex }, { headers: this.getHeader() });
    }

    activate(email: string) {
        return this.http.post(environment.api + 'api/users/activate?email=' + email, email, { headers: this.getHeaderNodeRed() });
    }

    paid(request) {
        return this.http.post(environment.api + 'api/users/paid', request, { headers: this.getHeader() });
    }

    payfast(token, action, header) {
        switch (action) {
            case 'fetch':
                return this.http.get('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            case 'pause':
                return this.http.put('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            case 'unpause':
                return this.http.put('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            case 'cancel':
                return this.http.put('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            case 'update':
                return this.http.patch('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            case 'adhoc':
                return this.http.post('https://api.payfast.co.za/subscriptions/' + token + '/' + action + (environment.pfHost == 'sandbox' ? '?testing=true' : ''), { headers: new HttpHeaders(header) });
            default:
                return null;
        }
    }

    updatePayfast(token: string, amount: number, custom_int1: number, custom_int2: number, custom_int3: number, custom_int4: number) {
        return this.http.post(environment.api + 'api/payfast/update', { token: token, amount_gross: amount, custom_int1: custom_int1, custom_int2: custom_int2, custom_int3: custom_int3, custom_int4: custom_int4 }, { headers: this.getHeader() });
    }

    deleteUser(email: string) {
        return this.http.post(environment.api + 'api/users/delete?email=' + email, email, { headers: this.getHeaderNodeRed() });
    }

    put(controller: string, data: any) {
        return this.http.put(environment.api + 'api/' + controller, data, { headers: this.getHeaderNodeRed() });
    }

    delete(controller: string, id: Guid) {
        return this.http.post(environment.api + 'api/' + controller + '/delete/' + id, { headers: this.getHeaderNodeRed() });
    }

    signIn(item) {
        return this.http.post(environment.api + 'users/sign-in', item, { headers: this.getHeader() });
    }

    updateUser(item) {
        return this.http.post(environment.api + 'api/users/update', item, { headers: this.getHeader() });
    }

    getUserPermissions(id) {
        return this.http.get(environment.api + 'api/users/permissions/' + id, { headers: this.getHeader() });
    }

    changePassword(item: any): Observable<any> {
        return this.http.post<any>(`${environment.api}api/users/change-password`, item);
    }

    getNavigation() {
        return this.http.get<Navigation>(environment.api + 'navigation', { headers: this.getHeader() });
    }

    upload(model, formData, filename) {
        return this.http.post(environment.api + 'api/' + model + '/uploadImage/' + filename, formData, { reportProgress: true, observe: 'events' });
    }





    contactUs(email) {
        return this.http.post(environment.apiUrlLunkulu + 'contact-us', { 'email': email }, { responseType: 'json' });
    }

    resetPassword(id, password) {
        return this.http.post(environment.apiUrlLunkulu + 'reset-password', { id: id, password: password });
    }

    sendEmail(clientId: Guid, prospectId: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'email' + '?clientId=' + clientId + '&prospectId=' + prospectId, { responseType: 'json' });
    }

    getData(table: string, id: Guid) {
        return this.http.get(environment.apiUrlLunkulu + table + '?id=' + id, { responseType: 'json' });
    }

    getNotes(clientId: Guid, createdBy: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'clientNote?clientId=' + clientId + '&createdBy=' + createdBy, { responseType: 'json' });
    }

    getDataByUser(table: string, id: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'user/' + table + '?id=' + id, { responseType: 'json' });
    }

    getView(table: string, id: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'view/' + table + '?id=' + id, { responseType: 'json' });
    }

    getViewByUser(table: string, id: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'view/user/' + table + '?id=' + id, { responseType: 'json' });
    }

    getTimesheetsReady(clientId: Guid, invoiceId: Guid) {
        return this.http.get(environment.apiUrlLunkulu + 'timesheet/invoice?clientId=' + clientId + '&invoiceId=' + invoiceId, { responseType: 'json' });
    }

    insertItem(table: string, item: any) {
        return this.http.post(environment.apiUrlLunkulu + table + '/insert', item, { responseType: 'json' });
    }

    updatItem(table: string, item: any) {
        return this.http.post(environment.apiUrlLunkulu + table + '/update', item, { responseType: 'json' });
    }

    deleteItem(table: string, item: any) {
        return this.http.post(environment.apiUrlLunkulu + table + '/delete', item, { responseType: 'json' });
    }

    deleteChildren(table: string, item: any) {
        return this.http.post(environment.apiUrlLunkulu + table + '/deleteChildren', item, { responseType: 'json' });
    }

    getList(table: string, id: Guid): Observable<any[]> {
        table = table.trim();

        return this.http.get<any[]>(environment.apiUrlLunkulu + table + '?id=' + id, { responseType: 'json' })
            .pipe();
    }

    payfastSubscribe(url, item) {
        return this.http.post(url, item, { headers: this.getHeaderPayfast() });
    }
}