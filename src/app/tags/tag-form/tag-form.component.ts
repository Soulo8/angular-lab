import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '../shared/tag.service';
import { Tag } from '../shared/tag.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.css'
})
export class TagFormComponent implements OnInit {
  tag$!: Observable<Tag>;
  tagId = '';

  constructor(private tagService: TagService) {}

  @Input()
  set id(tagId: string) {
    if (tagId !== undefined) {
      this.tagId = tagId;
      this.tag$ = this.tagService.getTag(tagId);
    }
  }

  private formBuilder = inject(FormBuilder);
  tagForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.tag$ !== undefined) {
      this.tag$.subscribe(tag => {
        this.tagForm.patchValue(tag);
      });
    }
  }

  onSubmit() {
    const tag: Tag = {
      name: this.tagForm.value.name ?? ''
    };

    if (this.tag$ !== undefined) {
      tag.id = parseInt(this.tagId);

      this.tagService.updateTag(tag).subscribe(() => {
        this.goToTagList();
      });
    } else {
      this.tagService.addTag(tag).subscribe(() => {
        this.goToTagList();
      });
    }
  }

  goToTagList() {
    this.router.navigate(['tags']);
  }
}
