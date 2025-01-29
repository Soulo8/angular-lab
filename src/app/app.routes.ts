import { Routes } from '@angular/router';
import { TagCreateComponent } from './tags/tag-create/tag-create.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagsComponent } from './tags/tags.component';


export const routes: Routes = [
    { path: 'tags', component: TagsComponent },
    { path: 'tags-add', component: TagCreateComponent },
    { path: 'tags-edit/:id', component: TagEditComponent },
];
