import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss']
})
export class SelectOptionsGroupsComponent implements OnInit {
  @Input() optionsGroups: DropdownOptionsGroups = {} as DropdownOptionsGroups;

  isExpandCategory: boolean[] = [];
  states = new FormControl();

  public expandDocumentTypes(group: any) {
    group.isSelected = !group.isSelected;
  }

  public optionClicked(name: string, index?: number) {
    // console.log('Selected option: ', name, 'having id: ', index);
    this.optionsGroups.optionClicked(name);
  }

  public toggleSelection(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.options);
    } else {
      group.options.forEach((x: string) => states.splice(states.indexOf(x), 1));
    }
    this.states.setValue(states);
    this.optionsGroups.groupClicked(group);
  }


  // #endregion



  constructor() { }

  ngOnInit(): void {
  }

}

export interface DropdownOptionsGroups {
  name: string;
  config: DropdownOptionsGroupsConfig;
  groups: MatOptionsGroup[];

  groupClicked: (group: any) => void;
  optionClicked: (option: any) => void;
}

export interface MatOptionsGroup {
  groupName: string;
  options: string[];
  isSelected: boolean
}

export interface DropdownOptionsGroupsConfig {
  canClose: boolean;
  style?: any;
}
