import { Component, OnInit } from '@angular/core';
import { UserService, RoleGuardService } from '../_services';

@Component({ templateUrl: 'audit.component.html', styleUrls: ['./audit.component.css'] })
export class AuditComponent implements OnInit {


    auditLogs: any;
    role: string;
    currentUid: string;
    p: number[] = [];
    constructor(private userService: UserService, private _roleGuardService: RoleGuardService) {
        this.role = this._roleGuardService.checkRole();
        this.currentUid = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    ngOnInit() {

        this.userService.getAuditLogs(this.currentUid, this.role).subscribe(logs => {
            this.auditLogs = logs;
        });
    }
}