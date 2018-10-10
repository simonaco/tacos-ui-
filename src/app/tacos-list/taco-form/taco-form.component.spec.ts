import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacoFormComponent } from './taco-form.component';

describe('TacoFormComponent', () => {
  let component: TacoFormComponent;
  let fixture: ComponentFixture<TacoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
