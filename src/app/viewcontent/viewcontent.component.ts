import { Component, Inject } from '@angular/core';
import { MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Shop } from '../shop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewcontent',
  standalone: true,
  imports: [MatDialogContent,MatDialogModule, MatButtonModule, DatePipe],
  templateUrl: './viewcontent.component.html',
  styleUrl: './viewcontent.component.css'
})
export class ViewcontentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Shop) {}
}
