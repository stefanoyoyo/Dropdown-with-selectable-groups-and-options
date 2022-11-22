import { Component } from '@angular/core';
import { optionsGroups } from 'src/mock-data/optionsGroups';
import { DropdownOptionsGroups, MatOptionsGroup } from './components/select-options-groups/select-options-groups.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SelectwithGroups';

  appData = optionsGroups;

  componentData: DropdownOptionsGroups = {
    name: 'ciao mondo',
    config: {
      canClose: false,
      style: {
        width: '1000px !important',
      }
    },
    groups: optionsGroups as MatOptionsGroup[]
  };
}
