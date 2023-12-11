import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-user-dialog',
  templateUrl: './make-user-dialog.component.html',
  styleUrls: ['./make-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeUserDialogComponent {
  public name: FormControl = new FormControl('', [Validators.required]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  public userCreated = false
  public showProgressbar = false
  public tenants: any
  public selectedTenant: any


  @ViewChild('createButton') createButton: any
  private http = inject(HttpClient)

  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.loadTanent()
  }

  createUser() {
    this.showProgressbar = true
    this.createButton._elementRef.nativeElement.disabled = true;

    const userName = this.name.value
    const userEmail = this.email.value
    const tenantName = this.selectedTenant["name"]

    this.http.get(`${environment.apiURL}/make-user/` + userEmail + "?name=" + userName).subscribe(
      result => {
        console.log("Add user to tenant: ", result, tenantName)
        this.http.put(`${environment.apiURL}/put-user-to-tenant/` + userEmail + "/" + tenantName, null).subscribe(() => {
          this.userCreated = true;
          this.showProgressbar = false
          this.cd.detectChanges();
        })
      })
  }

  loadTanent() {
    this.http.get(`${environment.apiURL}/show-tenants`).subscribe((tenants) => {
      this.tenants = tenants;
      this.cd.detectChanges();
    })
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
