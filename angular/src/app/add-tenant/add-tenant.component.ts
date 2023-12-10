import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent {
  public name: FormControl = new FormControl('', [Validators.required]);
  public tenantCreated = false
  public showProgressbar = false
  @ViewChild('createButton') createButton: any
  private http = inject(HttpClient)

  constructor(private cd: ChangeDetectorRef) { }

  createTenant() {
    this.createButton._elementRef.nativeElement.disabled = true;
    this.showProgressbar = true
    this.http.get(`${environment.apiURL}/make-tenant/` + this.name.value).subscribe((users) => {
      this.tenantCreated = true;
      this.showProgressbar = false
      this.cd.detectChanges();
    })
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
