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

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {

  }

  async ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.http.get(`${environment.apiURL}/list-users`).subscribe((users) => {
      this.users = users;
      this.users.forEach((user: any) => {
        this.http.get(`${environment.apiURL}/send-user-tenant/` + user.email).subscribe((tenant) => {
          user.tenant = tenant;
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
    this.http.post(`${environment.apiURL}/delete-user?email=` + user.email, null).subscribe(() => {
      const users = this.users;
      users.splice(users.indexOf(user), 1);
      this.users = users;
      this.cd.detectChanges();
    })
  }
}
