import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInnerPageComponent } from './banner-inner-page.component';

describe('BannerInnerPageComponent', () => {
  let component: BannerInnerPageComponent;
  let fixture: ComponentFixture<BannerInnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerInnerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
