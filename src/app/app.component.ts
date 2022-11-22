import { Component } from '@angular/core';
import { optionsGroups } from 'src/mock-data/optionsGroups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SelectwithGroups';

  appData = optionsGroups;
}
