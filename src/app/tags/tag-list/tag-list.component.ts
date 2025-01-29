import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagService } from './../shared/tag.service';

const DEFAULT_SORT_FIELD = 'id';
const DEFAULT_SORT_DIRECTION = 'desc';

@Component({
  selector: 'app-tag-list',
  imports: [RouterLink, MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css'
})
export class TagListComponent implements OnInit, AfterViewInit {
  tags: Tag[] = [];
  displayedColumns: string[] = ['id', '@id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Tag>(this.tags);
  length = 0;
  pageSize = 50;
  pageIndex = 0;
  pageEvent!: PageEvent;
  sortField: string = DEFAULT_SORT_FIELD;
  sortDirection: string = DEFAULT_SORT_DIRECTION;

  constructor(private tagService: TagService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getTags(this.pageIndex + 1, this.sortField, this.sortDirection);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;

    this.getTags(this.pageIndex + 1, this.sortField, this.sortDirection);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.getTags(this.pageIndex + 1, sortState.active, sortState.direction);
      this.sortField = sortState.active;
      this.sortDirection = sortState.direction;
    } else {
      this.getTags(this.pageIndex + 1, DEFAULT_SORT_FIELD, DEFAULT_SORT_DIRECTION);
      this.sortField = DEFAULT_SORT_FIELD;
      this.sortDirection = DEFAULT_SORT_DIRECTION;
    }
  }

  onDelete(tagId: number) {
    this.tagService.removeTag(tagId).subscribe(() => {
      this.getTags(this.pageIndex + 1, this.sortField, this.sortDirection);
    });
  }

  getTags(page: number, sortField: string, sortDirection: string) {
    this.tagService.getTags(page, sortField, sortDirection).subscribe(data => {
      this.tags = data['member'];
      this.length = data['totalItems'];
      this.dataSource.data = this.tags;

      if (page != 1 && this.tags.length == 0) {
        this.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        this.getTags(this.pageIndex + 1, sortField, sortDirection);
      }
    });
  }
}
