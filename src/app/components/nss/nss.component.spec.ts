import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NssComponent } from './nss.component';

describe('NssComponent', () => {
  let component: NssComponent;
  let fixture: ComponentFixture<NssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
