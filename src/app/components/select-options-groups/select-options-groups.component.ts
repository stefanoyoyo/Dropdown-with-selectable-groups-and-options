import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss']
})
export class SelectOptionsGroupsComponent implements OnInit {
  @Input() optionsGroups: any;

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
