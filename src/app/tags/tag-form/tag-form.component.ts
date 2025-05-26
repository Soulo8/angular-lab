import { Component, OnInit, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tag-form.component.html'
})
export class TagFormComponent implements OnInit {
  initialized = output<FormGroup>();
  formSubmitted = output<FormGroup>();

  private formBuilder = inject(FormBuilder);
  tagForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  ngOnInit() {
    this.initialized.emit(this.tagForm);
  }

  onSubmit() {
    this.formSubmitted.emit(this.tagForm);
  }
}
