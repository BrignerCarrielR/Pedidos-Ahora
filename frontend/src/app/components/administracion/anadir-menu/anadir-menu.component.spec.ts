import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirMenuComponent } from './anadir-menu.component';

describe('AnadirMenuComponent', () => {
  let component: AnadirMenuComponent;
  let fixture: ComponentFixture<AnadirMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
