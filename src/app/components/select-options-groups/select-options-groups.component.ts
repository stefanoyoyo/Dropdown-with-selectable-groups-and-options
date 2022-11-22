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

  // #region mock data

  optionsGroups = [
    {
      groupName: 'A',
      options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
      isSelected: false
    },
    {
      groupName: 'C',
      options: ['California', 'Colorado', 'Connecticut'],
      isSelected: false
    },
    {
      groupName: 'D',
      options: ['Delaware'],
      isSelected: false
    },
    {
      groupName: 'F',
      options: ['Florida'],
      isSelected: false
    },
    {
      groupName: 'G',
      options: ['Georgia'],
      isSelected: false
    },
    {
      groupName: 'H',
      options: ['Hawaii'],
      isSelected: false
    },
    {
      groupName: 'I',
      options: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
      isSelected: false
    },
    {
      groupName: 'K',
      options: ['Kansas', 'Kentucky'],
      isSelected: false
    },
    {
      groupName: 'L',
      options: ['Louisiana'],
      isSelected: false
    },
    {
      groupName: 'M',
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
      isSelected: false
    },
    {
      groupName: 'N',
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
      isSelected: false
    },
    {
      groupName: 'O',
      options: ['Ohio', 'Oklahoma', 'Oregon'],
      isSelected: false
    },
    {
      groupName: 'P',
      options: ['Pennsylvania'],
      selected: false
    },
    {
      groupName: 'R',
      options: ['Rhode Island'],
      isSelected: false
    },
    {
      groupName: 'S',
      options: ['South Carolina', 'South Dakota'],
      isSelected: false
    },
    {
      groupName: 'T',
      options: ['Tennessee', 'Texas'],
      isSelected: false
    },
    {
      groupName: 'U',
      options: ['Utah'],
      isSelected: false
    },
    {
      groupName: 'V',
      options: ['Vermont', 'Virginia'],
      isSelected: false
    },
    {
      groupName: 'W',
      options: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      isSelected: false
    },
  ];

  // #endregion

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
  groupName: string;
  options: string[];
  isSelected: boolean
}
