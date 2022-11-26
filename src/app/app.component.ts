import { Component } from '@angular/core';
import { optionsGroups } from 'src/mock-data/optionsGroups';
import { ComponentData, DropdownOptionsGroups, MatOptionsGroup } from './components/common-filter/select-options-groups/select-options-groups.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SelectwithGroups';

  componentData: ComponentData = {
    label: {
      content: 'UNITED STATES',
      style: {
        color: 'red',
        width: '30em'
      }
    },
    icon: {
      content: 'flag',
      style: {
        color: 'red'
      }
    },
    data: {
      name: 'ciao mondo',
      config: {
        canOpenOnComponentStart: false,
        canCloseGroups: true,
        maxSelectableGroups: 2,
        style: {
          whenClosed: {
            width: '15em',
          },
          whenOpened: {
            maxHeight: '75%',
            checkbox: {
              groups: {
                backgroundColor: 'rgba(0,0,0,0.2)'
              },
              options: {
                backgroundColor: 'rgba(255,0,0,0.2)'
              }
            }
          },

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
    }
  }

  constructor() {
  }
}
