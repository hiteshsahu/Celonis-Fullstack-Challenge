import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AddTenantComponent } from "../add-tenant/add-tenant.component";
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TenantsComponent {
  public tenants: any
  private http = inject(HttpClient)
  public showProgressbar = false

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.loadTanent()
  }

  loadTanent() {
    this.showProgressbar = true
    this.http.get(`${environment.apiURL}/show-tenants`).subscribe((tenants) => {
      this.tenants = tenants;
      this.showProgressbar = false
      this.cd.detectChanges();
    })
  }

  addTenant() {
    this.dialog.open(AddTenantComponent);
    this.dialog.afterAllClosed.subscribe(result => {
      this.loadTanent()
    });
  }

  deleteTenant(tenant: any) {
    this.showProgressbar = true
    this.http.post(`${environment.apiURL}/delete-tenant?name=` + tenant.name, null).subscribe((res) => {
      this.showProgressbar = false
      this.tenants.splice(this.tenants.indexOf(tenant), 1);
      this.cd.detectChanges();
    })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message);
  }
}


