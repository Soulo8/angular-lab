import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
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
