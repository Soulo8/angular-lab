import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { TagFormComponent } from './tags/tag-form/tag-form.component';

export const routes: Routes = [
    { path: 'tags', component: TagsComponent },
    { path: 'tags-add', component: TagFormComponent },
    { path: 'tags-edit/:id', component: TagFormComponent },
];
