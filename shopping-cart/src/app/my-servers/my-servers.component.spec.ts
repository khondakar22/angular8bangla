import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServersComponent } from './my-servers.component';

describe('MyServersComponent', () => {
  let component: MyServersComponent;
  let fixture: ComponentFixture<MyServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
