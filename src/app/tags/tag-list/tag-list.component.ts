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
    this.getTags(this.pageIndex);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    this.getTags(this.pageIndex);
  }

  onDelete(tagId: number) {
    this.tagService.removeTag(tagId).subscribe(() => {
      if (this.pageIndex != 0 && this.length < this.pageSize * (this.pageIndex + 1)) {
        this.pageIndex--;
      }

      this.getTags(this.pageIndex);
    });
  }

  getTags(pageIndex: number) {
    this.tagService.getTags(pageIndex).subscribe(data => {
      this.tags = data['member'];
      this.length = data['totalItems'];
    });
  }
}
