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
      style: {
        whenClosed: {
          width: '10em',
        },
        whenOpened: {
          maxHeight: '90vh'
        }
      }
    },
    groups: optionsGroups as MatOptionsGroup[],

    onGroupClicked: function (param: any): void {
      console.log('groupClicked callback called');
    },

    onOptionClicked: function (param: any): void {
      console.log('optionClicked callback called');
    },

    onSelectOpened: function (option?: any): void {
      console.log('onSelectOpened callback called');
    },

    onSelectClosed: function (option?: any): void {
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
