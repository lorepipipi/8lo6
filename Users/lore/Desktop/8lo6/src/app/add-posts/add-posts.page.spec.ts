import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from 'src/managers/addPostService';

describe('PostService', () => {
  let component: PostService;
  let fixture: ComponentFixture<PostService>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
