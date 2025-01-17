import { AsyncPipe } from '@angular/common';
import { TagService } from './../shared/tag.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../shared/tag.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent implements OnInit {
  tags$!: Observable<Tag[]>;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tags$ = this.tagService.getTags();
  }
}
