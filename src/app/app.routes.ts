import { Routes } from '@angular/router';
import { TagFormComponent } from './tags/tag-form/tag-form.component';
import { TagsComponent } from './tags/tags.component';

export const routes: Routes = [
    { path: 'tags', component: TagsComponent },
    { path: 'tags-add', component: TagFormComponent },
    { path: 'tags-edit/:id', component: TagFormComponent },
];
