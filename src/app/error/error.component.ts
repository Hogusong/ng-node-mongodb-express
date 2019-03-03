import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: ['button { color: red }']
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
