import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MakeUserDialogComponent } from "../make-user-dialog/make-user-dialog.component";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public users: any
  private dialog = inject(MatDialog)
  public showProgressbar = false

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.showProgressbar = true
    this.http.get(`${environment.apiURL}/list-users`).subscribe((users) => {
      this.users = users;
      this.users.forEach((user: any) => {
        this.http.get(`${environment.apiURL}/send-user-tenant/` + user.email).subscribe((tenant) => {
          user.tenant = tenant;
          this.showProgressbar = false
          this.cd.detectChanges();
        })
      });
    })
  }

  makeUser() {
    this.dialog.open(MakeUserDialogComponent)
    this.dialog.afterAllClosed.subscribe(result => {
      this.loadUsers()
    });
  }

  deleteUser(user: any) {
    this.showProgressbar = true
    this.http.post(`${environment.apiURL}/delete-user?email=` + user.email, null).subscribe(() => {
      this.users.splice(this.users.indexOf(user), 1);
      this.showProgressbar = false
      this.cd.detectChanges();
    })
  }
}
