import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServerComponent } from './my-server.component';

describe('MyServerComponent', () => {
  let component: MyServerComponent;
  let fixture: ComponentFixture<MyServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
