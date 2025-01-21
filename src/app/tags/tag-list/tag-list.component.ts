import { TagService } from './../shared/tag.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tag-list',
  imports: [RouterLink, MatPaginatorModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [];
  length = 0;
  pageSize = 50;
  pageIndex = 0;
  pageEvent!: PageEvent;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.getTags(this.pageIndex + 1);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;

    this.getTags(this.pageIndex + 1);
  }

  onDelete(tagId: number) {
    this.tagService.removeTag(tagId).subscribe(() => {
      this.getTags(this.pageIndex);
    });
  }

  getTags(page: number) {
    this.tagService.getTags(page).subscribe(data => {
      this.tags = data['member'];
      this.length = data['totalItems'];

      if (page != 1 && this.tags.length == 0) {
        this.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        this.getTags(this.pageIndex + 1);
      }
    });
  }
}
