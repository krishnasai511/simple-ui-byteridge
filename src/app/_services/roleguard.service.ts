import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt"


@Injectable({
    providedIn: 'root'
})

export class RoleGuardService {
    // private jwtHelper = new JwtHelperService();

    // constructor(public router: Router, public route: ActivatedRouteSnapshot) {
    // }

    // canActivate(route: ActivatedRouteSnapshot): boolean {
    //     const expectedRoles = route.data.expectedRoles || [];
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         this.router.navigate(['/login']);
    //         return false;
    //     }
    //     const decodedToken = this.jwtHelper.decodeToken(token);
    //     if (!expectedRoles.includes(decodedToken.role)) {
    //         this.router.navigate(['/']);
    //         return false;
    //     }
    //     return true;
    // }


    private jwtHelper = new JwtHelperService();

    constructor(public router: Router) {
    }

    checkRole() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role;
    }
} 