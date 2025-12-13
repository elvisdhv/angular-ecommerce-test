import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySuccesfullComponent } from './buy-succesfull.component';

describe('BuySuccesfullComponent', () => {
  let component: BuySuccesfullComponent;
  let fixture: ComponentFixture<BuySuccesfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySuccesfullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
