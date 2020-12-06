import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePreviewComponent } from './movie-preview.component';

describe('MoviePreviewComponent', () => {
  let component: MoviePreviewComponent;
  let fixture: ComponentFixture<MoviePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});
