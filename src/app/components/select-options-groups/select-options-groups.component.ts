import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss'],
})
export class SelectOptionsGroupsComponent implements AfterViewInit {
  @ViewChild('mySelect') mySelect: any;
  @Input() optionsGroups: DropdownOptionsGroups = {} as DropdownOptionsGroups;
  states = new FormControl();

  public expandDocumentTypes(group: any) {
    group.isSelected = !group.isSelected;
  }

  public optionClicked(name: string, index?: number) {
    this.optionsGroups.onOptionClicked(name);
  }

  public groupClicked(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      states.push(...group.options);
    } else {
      group.options.forEach((x: string) => states.splice(states.indexOf(x), 1));
    }
    this.states.setValue(states);
    group.isSelected = !group.isSelected;
    this.optionsGroups.onGroupClicked(group);
  }

  openDropdown() {
    this.applyDropdownHeightWhenOpened();
    this.mySelect.open();
    this.optionsGroups.onSelectOpened();
  }

  // #endregion

  constructor() {}

  ngAfterViewInit(): void {
    this.mySelect.open();
    this.applyDropdownHeightWhenOpened();
  }

  applyDropdownHeightWhenOpened() {
    if (this.optionsGroups == null) return;
    if (this.optionsGroups.config == null) return;
    if (this.optionsGroups.config.style == null) return;
    if (this.optionsGroups.config.style.whenOpened == null) return;
    if (this.optionsGroups.config.style.whenOpened.maxHeight == null) return;
    setTimeout(() => {
      // Definisco manualmente l'altezza della tendina
      const elements = document.querySelectorAll('.mat-select-panel');
      if (elements.length == 0) return;
      const first = elements[0] as HTMLElement;
      first.style.maxHeight = this.optionsGroups.config.style?.whenOpened?.maxHeight ?? '';
    }, 0);
  }
}

export interface DropdownOptionsGroups {
  name: string;
  config: DropdownOptionsGroupsConfig;
  groups: MatOptionsGroup[];

  /**Callbacks */
  onGroupClicked: (group?: any) => void;
  onOptionClicked: (option?: any) => void;

  onSelectOpened: (option?: any) => void;
  onSelectClosed: (option?: any) => void;
}

export interface MatOptionsGroup {
  groupName: string;
  options: string[];
  isSelected: boolean;
}

export interface DropdownOptionsGroupsConfig {
  canClose: boolean;
  style?: DropdownOptionsGroupsStyle;
}

export interface DropdownOptionsGroupsStyle {
  whenClosed?: any;
  whenOpened?: DropdownOptionsGroupsStyleWhenOpened;
}

export interface DropdownOptionsGroupsStyleWhenOpened {

  /**Height asdumed by the drop down when opened.
   * Note: no need to use !important
  */
  maxHeight?: string;
}
