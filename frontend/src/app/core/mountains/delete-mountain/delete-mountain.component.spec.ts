import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMountainComponent } from './delete-mountain.component';

describe('DeleteMountainComponent', () => {
  let component: DeleteMountainComponent;
  let fixture: ComponentFixture<DeleteMountainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMountainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMountainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
