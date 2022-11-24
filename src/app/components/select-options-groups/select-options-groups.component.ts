import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { deepCopy } from 'src/shared/objectHelper';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss'],
})
export class SelectOptionsGroupsComponent implements AfterViewInit {
  @ViewChild('mySelect') mySelect: any;
  @Input() optionsGroups: DropdownOptionsGroups = {} as DropdownOptionsGroups;
  states = new FormControl();

  selectPanel: any;

  latestScrollsTop: number[] = [0];

  constructor() {}

  ngAfterViewInit(): void {
    this.mySelect.open();
    this.checkGroups();
    this.applyDropdownHeightWhenOpened();
    // this.applyCheckboxColor();
    this.mySelect.openedChange.subscribe(() => this.registerPanelScrollEvent());
    // setTimeout(() => {
    //   // Salvo un riferimento al pannello della tendina di material
    //   this.selectPanel = this.mySelect.panel.nativeElement;
    //   // Inizializzo lo scroll del pannello a 0
    //   this.selectPanel.scrollTop = 0;
    // }, 0);
    this.getMaterialselectPanel().then((res)=> {
      console.log('res ddd')
      console.log(res)
      // Salvo un riferimento al pannello della tendina di material
      this.selectPanel = res;
      // Inizializzo lo scroll del pannello a 0
      this.selectPanel.scrollTop = 0;
    })
  }

  /**Method returning a promise listening to the material select panel
   * and returning it when ready on the page. */
  async getMaterialselectPanel() {
    const promise = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        console.log('blaa')
        let selectPanel = this.mySelect.panel.nativeElement;
        if (selectPanel != null) {
          clearInterval(interval);
          resolve(selectPanel);
        };
      }, 0);
    });

    return promise;
  }

  /**Method listening to all scrolls requests applied on the material select */
  registerPanelScrollEvent() {
    const panel = this.mySelect.panel.nativeElement;
    panel.addEventListener('scroll', (event: any) => {
      this.latestScrollsTop.push(panel.scrollTop);
    });
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

  // #region events listeners

  /**Method managing an option click from the select. */
  public onOptionClicked(group: any, name: string, index?: number) {
    const scrolltopBck = deepCopy(
      this.latestScrollsTop[this.latestScrollsTop.length - 1]
    );
    this.selectPanel.scrollTop = scrolltopBck;
    group.isSelected = true;
    if (!this.canCheckGroup(group)) group.isSelected = false;
    this.optionsGroups.onOptionClicked(group, name);
  }

  /**Method managing an group click from the select. */
  public onGroupClicked(event: any, group: any) {
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

  /**Method opening / collapsing groups when the select icon is clicked */
  public onExpandGroup(group: any) {
    group.isOpened = !group.isOpened;
  }

  // #endregion

  // #region methods

  openDropdown() {
    this.applyDropdownHeightWhenOpened();
    this.mySelect.open();
    this.optionsGroups.onSelectOpened();
  }

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
    this.optionsGroups.groups.forEach((group) => {
      if (group?.isSelected) this.checkGroup(group);
    });
  }

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

  // #region still to implement

  /**Method making the select's height match to the specifications,
   * as the material input does not allow it by default.  */
  applyCheckboxColor() {
    if (this.optionsGroups == null) return;
    if (this.optionsGroups.config == null) return;
    if (this.optionsGroups.config.style == null) return;
    if (this.optionsGroups.config.style.whenOpened == null) return;
    if (this.optionsGroups.config.style.whenOpened.maxHeight == null) return;
    setTimeout(() => {
      const classname =
        '.mat-checkbox-checked .mat-checkbox-background,.mat-checkbox-indeterminate .mat-checkbox-background';
      // Definisco manualmente l'altezza della tendina
      const elements = document.querySelectorAll(classname);
      if (elements.length == 0) return;
      elements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.background = '#deb456'; // Color from config.
      });
    }, 0);
  }
  // #endregion

  //#endregion

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
  whenClosed?: DropdownOptionsGroupsStyleWhenClosed;
  whenOpened?: DropdownOptionsGroupsStyleWhenOpened;
}

export interface DropdownOptionsGroupsStyleWhenClosed {
  width?: string;
}

export interface DropdownOptionsGroupsStyleWhenOpened {
  /**Height asdumed by the drop down when opened.
   * Note: no need to use !important
   */
  maxHeight?: string;
  height?: string;
  minHeight?: string;
}
