import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', user.token);
                }

                return user;
            }));
    }

    logout() {
        let login_id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).login_id : '';
        if (login_id) {
            this.http.get(`${config.apiUrl}/users/logout/` + login_id)
                .pipe(map(user => user)).subscribe(res => res);
        }
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token')
    }
}