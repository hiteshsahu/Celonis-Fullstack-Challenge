import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShowUserComponent } from './show-user.component';

describe('ShowUserComponent', () => {
  let component: ShowUserComponent;
  let fixture: ComponentFixture<ShowUserComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ShowUserComponent,
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

    fixture = TestBed.createComponent(ShowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
