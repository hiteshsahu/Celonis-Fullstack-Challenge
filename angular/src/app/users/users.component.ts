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
  private nextPropety = 0
  private rentalProperties = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/259751/pexels-photo-259751.jpeg?auto=compress&cs=tinysrgb&w=600"]


  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.showProgressbar = true
    this.nextPropety = 0
    this.http.get(`${environment.apiURL}/list-users`).subscribe((users) => {
      this.users = users;
      this.users.forEach((user: any) => {
        this.http.get(`${environment.apiURL}/send-user-tenant/` + user.email).subscribe((tenant) => {
          user.tenant = tenant;
          user.rentalImage = this.getHouseImage();
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


  getHouseImage = () => {
    const rentalProperty = this.rentalProperties[this.nextPropety]
    if (this.nextPropety >= this.rentalProperties.length) {
      this.nextPropety = 0
    } else {
      this.nextPropety++
    }
    return rentalProperty
  }
}
