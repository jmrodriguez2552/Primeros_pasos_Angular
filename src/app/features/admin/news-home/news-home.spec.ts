import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHome } from './news-home';

describe('NewsHome', () => {
  let component: NewsHome;
  let fixture: ComponentFixture<NewsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
