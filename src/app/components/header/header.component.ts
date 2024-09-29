import { Component } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiHeader],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
