import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMountainComponent } from './edit-mountain.component';

describe('EditMountainComponent', () => {
  let component: EditMountainComponent;
  let fixture: ComponentFixture<EditMountainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMountainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMountainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
