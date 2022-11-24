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

  componentData: DropdownOptionsGroups = {
    name: 'ciao mondo',
    config: {
      canCloseGroups: true,
      maxSelectableGroups: 1,
      style: {
        whenClosed: {
          width: '15em',
        },
        whenOpened: {
          maxHeight: '75%',
        }
      }
    },
    groups: optionsGroups as MatOptionsGroup[],

    onGroupClicked: function (group: any): void {
      console.log('groupClicked callback called');
    },

    onOptionClicked: function (group: any, option: any, index?: number): void {
      console.log('optionClicked callback called');
    },

    onSelectOpened: function (componentData?: any): void {
      console.log('onSelectOpened callback called');
    },

    onSelectClosed: function (componentData?: any): void {
      console.error('NOT YET IMPLEMENTED! ');
    }
  };

  constructor() {
    // let time = 2500;
    // setInterval(() => {
    //   console.log(this.componentData)
    // }, 2500);
  }
}
