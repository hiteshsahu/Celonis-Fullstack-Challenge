import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { environment } from '../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent {
  public user: any;
  @Input() id: any;
  public editMode: boolean = false;
  public name: string = ""
  private http = inject(HttpClient)

  constructor(http: HttpClient, private snackBar: MatSnackBar) {
    setTimeout(() => {
      this.showUser();
    }, 100)
  }

  editUser() {
    this.editMode = true;
  }

  saveUser() {
    this.editMode = false;
    this.updateUser()
  }

  showUser() {
    this.http.get(`${environment.apiURL}/show-user/` + this.id).subscribe((user: any) => {
      this.user = user;
      this.name = user.name;
    });
  }

  updateUser() {
    this.http.put(`${environment.apiURL}/update-user/` + this.id + '?name=' + this.name, null).subscribe((res) => {
      console.log(res);
      this.showSnackBar("User Updated!")
      this.showUser();
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message);
  }
}
