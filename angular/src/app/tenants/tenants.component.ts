import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AddTenantComponent} from "../add-tenant/add-tenant.component";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent {
  public tenants: any
  private http = inject(HttpClient)

  constructor(http: HttpClient, public dialog: MatDialog) {
    http.get(`${environment.apiURL}/show-tenants`).subscribe((tenants) => {
      this.tenants = tenants;
    })
  }


  addTenant() {
    this.dialog.open(AddTenantComponent);
  }

  deleteTenant(tenant: any) {
    this.tenants.splice(this.tenants.indexOf(tenant), 1);
    this.http.post(`${environment.apiURL}/delete-tenant?name=` + tenant.name, {}).subscribe((res) => {
      console.log(res);
    })
  }
}
