import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileServiceComponent } from './upload-file-service.component';

describe('UploadFileServiceComponent', () => {
  let component: UploadFileServiceComponent;
  let fixture: ComponentFixture<UploadFileServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
