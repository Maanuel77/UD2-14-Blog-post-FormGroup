import { Routes } from '@angular/router';
import { BlogPostPage } from './pages/blog-post-page/blog-post-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: BlogPostPage },
  { path: '**', component: NotFoundPage },
];
