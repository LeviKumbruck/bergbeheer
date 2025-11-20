import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainItemComponent } from './mountain-item.component';

describe('MountainItemComponent', () => {
  let component: MountainItemComponent;
  let fixture: ComponentFixture<MountainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
