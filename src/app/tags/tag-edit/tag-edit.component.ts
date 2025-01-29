import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tag-edit',
  imports: [TagFormComponent],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.css'
})
export class TagEditComponent {
  tag$!: Observable<Tag>;
  @Input() id = '';

  constructor(private tagService: TagService) {}

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  onInit(tagForm: FormGroup) {
    this.tag$ = this.tagService.getTag(this.id);

    this.tag$.subscribe(tag => {
      tagForm.patchValue(tag);
    });
  }

  onSubmit(tagForm: FormGroup) {
    const tag: Tag = {
      name: tagForm.value.name ?? ''
    };

    tag.id = parseInt(this.id);

    this.tagService.updateTag(tag).subscribe(() => {
      this.goToTagList();
    });
  }

  goToTagList() {
    this.snackBar.open('Enregistrement réussi', 'Fermer', {
      duration: 5 * 1000,
    });
    this.router.navigate(['tags']);
  }
}
