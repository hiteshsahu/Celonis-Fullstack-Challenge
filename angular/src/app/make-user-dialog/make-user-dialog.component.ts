import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-user-dialog',
  templateUrl: './make-user-dialog.component.html',
  styleUrls: ['./make-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeUserDialogComponent {
  public name: any
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public userCreated = false
  @ViewChild('createButton') createButton: any
  private http = inject(HttpClient)

  constructor(private cd: ChangeDetectorRef) { }

  createUser() {
    this.createButton._elementRef.nativeElement.disabled = true;
    this.http.get(`${environment.apiURL}/make-user/` + this.email.value + "?name=" + this.name).subscribe((users) => {
      this.userCreated = true;
      this.cd.detectChanges();
    })
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :'';
  }
}
