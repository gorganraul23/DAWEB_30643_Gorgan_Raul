import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResidenceComponent } from './delete-residence.component';

describe('DeleteResidenceComponent', () => {
  let component: DeleteResidenceComponent;
  let fixture: ComponentFixture<DeleteResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteResidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
