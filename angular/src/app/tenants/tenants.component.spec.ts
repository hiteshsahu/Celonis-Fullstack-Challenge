import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TenantsComponent } from './tenants.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('TenantsComponent', () => {
  let component: TenantsComponent;
  let fixture: ComponentFixture<TenantsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantsComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatListModule,
        HttpClientTestingModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressBarModule
      ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    
    fixture = TestBed.createComponent(TenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
