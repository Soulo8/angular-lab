import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreateComponent } from './tag-create.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

describe('TagCreateComponent', () => {
  let component: TagCreateComponent;
  let fixture: ComponentFixture<TagCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideAnimationsAsync(),
      ],
      imports: [TagCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
