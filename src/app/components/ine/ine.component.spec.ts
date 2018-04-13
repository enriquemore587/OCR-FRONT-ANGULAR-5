import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IneComponent } from './ine.component';

describe('IneComponent', () => {
  let component: IneComponent;
  let fixture: ComponentFixture<IneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
