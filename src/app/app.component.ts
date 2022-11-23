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
      canClose: false,
      style: {
        whenClosed : {
          width: '20em',
        },
        whenOpened : {
          maxHeight: '90vh'
        }
      }
    },
    groups: optionsGroups as MatOptionsGroup[],

    groupClicked: function (param: any): void {
      console.log('groupClicked callback called')
      // console.log(param)
    },

    optionClicked: function (param: any): void {
      console.log('optionClicked callback called')
      // console.log(param)
    }
  };

  constructor() {
    // let time = 2500;
    // setInterval(() => {
    //   console.log(this.componentData)
    // }, 2500);
  }
}
