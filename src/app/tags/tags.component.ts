import { Component } from '@angular/core';
import { TagListComponent } from "./tag-list/tag-list.component";

@Component({
  selector: 'app-tags',
  imports: [TagListComponent],
  templateUrl: './tags.component.html'
})
export class TagsComponent {

}
