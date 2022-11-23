import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  constructor() {}

  ngAfterViewInit(): void {
    this.mySelect.open();
    this.applyDropdownHeightWhenOpened();
    console.log('fireeee');
    this.checkGroups();
  }

  public expandDocumentTypes(group: any) {
    group.isOpened = !group.isOpened;
  }

  public optionClicked(group: any, name: string, index?: number) {
    group.isSelected = true;
    if (!this.canCheckGroup(group)) group.isSelected = false;
    this.optionsGroups.onOptionClicked(group, name);
  }

  /**Method determinating if the group toggle shold turn on or not. */
  public canCheckGroup(group: any): boolean {
    let groupOff = false;
    for (const option of group.options) {
      groupOff = groupOff || this.states?.value?.includes(option);
      if (groupOff) return true;
    }

    return groupOff;
  }

  public groupClicked(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      // imposto a checked tutte le options del gruppo
      states.push(...group.options);
    } else {
      // imposto ad unchecked tutte le options del gruppo
      group.options.forEach((x: string) => states.splice(states.indexOf(x), 1));
    }
    this.states.setValue(states);
    group.isSelected = event.checked;
    this.optionsGroups.onGroupClicked(group);
    console.log(group);
  }

  openDropdown() {
    this.applyDropdownHeightWhenOpened();
    this.mySelect.open();
    this.optionsGroups.onSelectOpened();
  }

    // #region check group

  /**Method to check a group and the options included into it. */
  private checkGroup(group: MatOptionsGroup) {
    let states = this.states.value;
    states = states ? states : [];
    states.push(...group.options);
    this.states.setValue(states);
  }

  /**Method iterating all groups in order to check the ones marked as "check" */
  checkGroups() {
    if (this.optionsGroups.groups == null) return;
    this.optionsGroups.groups.forEach(group => {
      if (group?.isSelected) this.checkGroup(group);
    });
  }

  // #endregion


  /**Method making the select's height match to the specifications,
   * as the material input does not allow it by default.  */
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
      first.style.maxHeight =
        this.optionsGroups.config.style?.whenOpened?.maxHeight ?? '';
    }, 0);
  }
}

export interface DropdownOptionsGroups {
  name: string;
  config: DropdownOptionsGroupsConfig;
  groups: MatOptionsGroup[];

  /**Callbacks */
  onGroupClicked: (group?: any) => void;
  onOptionClicked: (group?: any, option?: any) => void;
  onSelectOpened: (componentData?: any) => void;
  onSelectClosed: (componentData?: any) => void;
}

export interface MatOptionsGroup {
  groupName: string;
  options: string[];
  isSelected: boolean;
  isOpened: boolean;
}

export interface DropdownOptionsGroupsConfig {
  canCloseGroups: boolean;
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
