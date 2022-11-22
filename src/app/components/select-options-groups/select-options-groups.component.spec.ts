import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionsGroupsComponent } from './select-options-groups.component';

describe('SelectOptionsGroupsComponent', () => {
  let component: SelectOptionsGroupsComponent;
  let fixture: ComponentFixture<SelectOptionsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOptionsGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
