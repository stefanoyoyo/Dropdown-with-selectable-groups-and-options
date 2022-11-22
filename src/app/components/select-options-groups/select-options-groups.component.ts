import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss']
})
export class SelectOptionsGroupsComponent implements OnInit {

  // #region tendina 1

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  // #endregion

  // #region tendina 2
  isExpandCategory: boolean[] = [];
  states = new FormControl();

  expandDocumentTypes(group: any) {
    group.selected = !group.selected;
  }

  optionClicked(name: string, index?: number) {
    console.log('Selected option: ', name, 'having id: ', index);
  }

  toggleSelection(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.options);
    } else {
      group.options.forEach((x: string) => states.splice(states.indexOf(x), 1));
    }
    this.states.setValue(states);
  }



  optionsGroups = [
    {
      groupLabel: 'A',
      options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
      selected: false
    },
    {
      groupLabel: 'C',
      options: ['California', 'Colorado', 'Connecticut'],
      selected: false
    },
    {
      groupLabel: 'D',
      options: ['Delaware'],
      selected: false
    },
    {
      groupLabel: 'F',
      options: ['Florida'],
      selected: false
    },
    {
      groupLabel: 'G',
      options: ['Georgia'],
      selected: false
    },
    {
      groupLabel: 'H',
      options: ['Hawaii'],
      selected: false
    },
    {
      groupLabel: 'I',
      options: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
      selected: false
    },
    {
      groupLabel: 'K',
      options: ['Kansas', 'Kentucky'],
      selected: false
    },
    {
      groupLabel: 'L',
      options: ['Louisiana'],
      selected: false
    },
    {
      groupLabel: 'M',
      options: [
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
      ],
      selected: false
    },
    {
      groupLabel: 'N',
      options: [
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ],
      selected: false
    },
    {
      groupLabel: 'O',
      options: ['Ohio', 'Oklahoma', 'Oregon'],
      selected: false
    },
    {
      groupLabel: 'P',
      options: ['Pennsylvania'],
      selected: false
    },
    {
      groupLabel: 'R',
      options: ['Rhode Island'],
      selected: false
    },
    {
      groupLabel: 'S',
      options: ['South Carolina', 'South Dakota'],
      selected: false
    },
    {
      groupLabel: 'T',
      options: ['Tennessee', 'Texas'],
      selected: false
    },
    {
      groupLabel: 'U',
      options: ['Utah'],
      selected: false
    },
    {
      groupLabel: 'V',
      options: ['Vermont', 'Virginia'],
      selected: false
    },
    {
      groupLabel: 'W',
      options: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      selected: false
    },
  ];

  // #endregion



  constructor() { }

  ngOnInit(): void {
  }

}

export interface DropdownOptionsGroups {
  label: string;
  groups: MatOptionsGroup;
}

export interface MatOptionsGroup {
  groupLabel: string;
  options: string[];
}
