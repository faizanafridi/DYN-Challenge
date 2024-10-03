import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Marking this component as standalone
  imports: [RouterOutlet], // Import RouterOutlet to use it in the template
})
export class AppComponent {
  title = 'DYN Application'; // Application title
}
