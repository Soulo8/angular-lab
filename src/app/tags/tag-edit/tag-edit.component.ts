import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tag-edit',
  imports: [TagFormComponent],
  templateUrl: './tag-edit.component.html'
})
export class TagEditComponent {
  @Input() id = '';

  constructor(private tagService: TagService) {}

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  onInit(tagForm: FormGroup) {
    this.tagService.getTag(this.id).subscribe(tag => {
      tagForm.patchValue(tag);
    });
  }

  onSubmit(tagForm: FormGroup) {
    const tag: Tag = {
      id: parseInt(this.id),
      name: tagForm.value.name ?? ''
    };

    this.tagService.updateTag(tag).subscribe(() => {
      this.snackBar.open('Enregistrement réussi', 'Fermer', {
        duration: 5 * 1000,
      });
      this.goToTagList();
    });
  }

  goToTagList() {
    this.router.navigate(['tags']);
  }
}
