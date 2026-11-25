import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-blog-post-page',
  styleUrl: './blog-post-page.css',
  templateUrl: './blog-post-page.html',
})
export class BlogPostPage {
  categorias = ['Tecnología', 'Diseño', 'Programación', 'Novedades'];

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    publishNow: new FormControl(true),
    publishDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  publicado: any = null;

  constructor() {
    const fecha = this.postForm.controls.publishDate;
    this.postForm.controls.publishNow.valueChanges.subscribe((ahora) => {
      if (ahora) fecha.reset({ value: '', disabled: true });
      else fecha.enable();
    });
  }

  hasError(field: string, error: string) {
    const control = this.postForm.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  publicar() {
    const datos = this.postForm.getRawValue();
    this.publicado = {
      ...datos,
      tags: (datos.tags ?? '').split(',').map((t) => t.trim()).filter((t) => t),
      publishDate: datos.publishNow ? new Date().toISOString().slice(0, 10) : datos.publishDate,
    };
    console.log(this.publicado);
    this.postForm.reset({ publishNow: true });
  }
}
