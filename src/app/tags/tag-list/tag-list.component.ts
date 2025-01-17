import { AsyncPipe } from '@angular/common';
import { TagService } from './../shared/tag.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../shared/tag.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent implements OnInit {
  tags$!: Observable<Tag[]>;

  constructor(private tagService: TagService) {}

  private readonly router = inject(Router);

  ngOnInit(): void {
    this.tags$ = this.tagService.getTags();
  }

  onDelete(tagId: number) {
    this.tagService.removeTag(tagId).subscribe(() => {
      this.tags$ = this.tagService.getTags();
    });
  }
}
