import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditComponent } from './tag-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

describe('TagEditComponent', () => {
  let component: TagEditComponent;
  let fixture: ComponentFixture<TagEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideAnimationsAsync(),
      ],
      imports: [TagEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
