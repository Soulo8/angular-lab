import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tag-create',
  imports: [TagFormComponent],
  templateUrl: './tag-create.component.html',
  styleUrl: './tag-create.component.css'
})
export class TagCreateComponent {
  constructor(private tagService: TagService) {}

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  onSubmit(tagForm: FormGroup) {
    const tag: Tag = {
      name: tagForm.value.name ?? ''
    };

    this.tagService.addTag(tag).subscribe(() => {
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
