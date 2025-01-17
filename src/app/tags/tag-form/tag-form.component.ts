import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '../shared/tag.service';
import { Tag } from '../shared/tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent {
  private formBuilder = inject(FormBuilder);
  tagForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  private readonly router = inject(Router);

  constructor(private tagService: TagService) {}

  onSubmit() {
    const tag: Tag = {
      name: this.tagForm.value.name ?? ''
    };

    this.tagService.addTag(tag).subscribe(() => {
      this.goToTagList();
    });
  }

  goToTagList() {
    this.router.navigate(['tags']);
  }
}
