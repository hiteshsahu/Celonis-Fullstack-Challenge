import { Component, inject, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent {
  public name: any
  public tenantCreated = false
  @ViewChild('createButton') createButton: any
  private http = inject(HttpClient)

  createTenant() {
    this.createButton._elementRef.nativeElement.disabled = true;
    this.http.get(`${environment.apiURL}/make-tenant/` + this.name).subscribe((users) => {
      this.tenantCreated = true;
    })
  }
}
