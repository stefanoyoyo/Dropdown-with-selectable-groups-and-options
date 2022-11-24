import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
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
    // Quando esise il pannello sul DOM, porto lo scroll a 0
    this.scrollTopMatPanel();
    console.log('this.optionsGroups');
    console.log(this.optionsGroups);
  }

  /**Method listening to all scrolls requests applied on the material select */
  registerPanelScrollEvent() {
    const panel = this.mySelect.panel.nativeElement;
    panel.addEventListener('scroll', (event: any) => {
      this.latestScrollsTop.push(panel.scrollTop);
    });
  }

  // #region promises

  /**Method returning a promise listening to the material select panel
   * and returning it when ready on the page. */
  async getMaterialselectPanel() {
    const promise = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        let selectPanel = this.mySelect.panel.nativeElement;
        if (selectPanel != null) {
          clearInterval(interval);
          resolve(selectPanel);
        }
      }, 0);
    });

    return promise;
  }

  //#endregion

  // #region events listeners

  /**Method managing an option click from the select. */
  public onOptionClicked(group: any, option: any, index: number) {
    console.log('this.states.value');
    console.log(this.states.value);
    const scrolltopBck = deepCopy(
      this.latestScrollsTop[this.latestScrollsTop.length - 1]
    );
    this.selectPanel.scrollTop = scrolltopBck;
    group.isSelected = true;
    option.isSelected = !option.isSelected;
    if (!this.canCheckGroup(group)) group.isSelected = false;
    console.log('this.optionsGroups');
    console.log(this.optionsGroups);
    // Se la configurazione prevede un limite massimo ai gruppi selezionati, deseleziono gli altri
    // if (this.optionsGroups.config.maxSelectableGroups != null) {
    //   if ( this.getSelectedGroupsCount() >= this.optionsGroups.config.maxSelectableGroups ) {
    //     // this.deselectAllGroups();
    //     // group.isSelected = true;
    //   }
    // }

    this.optionsGroups.onOptionClicked(group, option, index);
  }

  /**Method managing an group click from the select. */
  public onGroupClicked(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      // Se la configurazione prevede un limite massimo ai gruppi selezionati, deseleziono gli altri
      if (this.optionsGroups.config.maxSelectableGroups != null) {
        if ( this.getSelectedGroupsCount() >= this.optionsGroups.config.maxSelectableGroups ) {
          this.deselectAllGroups();
          group.isSelected = true;
        }
      }
      // imposto a checked tutte le options del gruppo
      states.push(...group.options.map((row: MatOptionInfo) => row.name));
      group.options.forEach((option: MatOptionInfo) => {
        option.isSelected = true;
      });
    } else {
      // imposto ad unchecked tutte le options del gruppo
      group.options
        .map((row: MatOptionInfo) => row.name)
        .forEach((x: string) => states.splice(states.indexOf(x), 1));
      group.options.forEach((option: MatOptionInfo) => {
        option.isSelected = false;
      });
    }
    this.states.setValue(states);
    group.isSelected = event.checked;

    console.log('this.optionsGroups');
    console.log(this.optionsGroups);

    this.optionsGroups.onGroupClicked(group);
  }

  /**Method to deselect all the groups actually selected */
  deselectAllGroups() {
    return this.optionsGroups.groups.forEach((group) => {
      let states = this.states.value;
      states = states ? states : [];
      group.isSelected = false;
      // Deselezione delle options degli altri gruppi
      group.options
        .map((row: MatOptionInfo) => row.name)
        .forEach((x: string) => states.splice(states.indexOf(x), 1));
    });
  }

  /**Method returning the number of selected groups */
  private getSelectedGroupsCount(): number {
    return this.optionsGroups.groups.filter((row) => row.isSelected).length + 1;
  }

  /**Method opening / collapsing groups when the select icon is clicked */
  public onExpandGroup(group: any) {
    group.isOpened = !group.isOpened;
  }

  // #endregion

  // #region methods

  /**Method to open the dropdown programmatically.
   * Often calld by the view. */
  openDropdownProgrammatically() {
    this.applyDropdownHeightWhenOpened();
    this.mySelect.open();
    // Quando esise il pannello della select sul DOM, porto lo scroll a 0
    this.scrollTopMatPanel();
    this.optionsGroups.onSelectOpened();
  }

  private scrollTopMatPanel() {
    this.getMaterialselectPanel().then((res) => {
      // Salvo un riferimento al pannello della tendina di material
      this.selectPanel = res;
      // Inizializzo lo scroll del pannello a 0
      this.selectPanel.scrollTop = 0;
    });
  }

  /**Method to check a group and the options included into it. */
  private checkGroup(group: MatOptionsGroup, checkStatus: boolean = true) {
    let states = this.checkOptions(checkStatus, group.options);
    this.states.setValue(states);
    group.options.forEach((option) => (option.isSelected = checkStatus));
  }

  private checkOptions(checkStatus: boolean, options: MatOptionInfo[]) {
    let states = this.states.value;
    states = states ? states : [];
    // Attivo tutte le options specificate
    options.forEach((option) => {
      option.isSelected = true;
    });
    if (checkStatus)
      states.push(...options.map((option: MatOptionInfo) => option.name));

    return states;
  }

  /**Method iterating all groups in order to check the ones marked as "check" */
  checkGroups() {
    if (this.optionsGroups.groups == null) return;
    this.optionsGroups.groups.forEach((group) => {
      if (group?.isSelected) this.checkGroup(group, true);
      else this.checkGroup(group, false);
    });
  }

  /**Method making the select's height match to the specifications,
   * as the material input does not allow it by default.  */
  applyDropdownHeightWhenOpened() {
    if (this.optionsGroups == null) return;
    if (this.optionsGroups.config == null) return;
    if (this.optionsGroups.config.style == null) return;
    if (this.optionsGroups.config.style.whenOpened == null) return;
    this.getMaterialselectPanel().then((res: any) => {
      // E' sicuro che il pannello sia presente sul DOM.
      // Definisco manualmente l'altezza della tendina
      // TODO: usare res per cambiare lo stile del pannello
      const elements = document.querySelectorAll('.mat-select-panel');
      if (elements.length == 0) return;
      const first = elements[0] as HTMLElement;
      first.style.maxHeight =
        this.optionsGroups.config.style?.whenOpened?.maxHeight ?? '';
    });
  }

  /**Method determinating if the group toggle shold turn on or not. */
  public canCheckGroup(group: any): boolean {
    let groupOff = false;
    for (const option of group.options) {
      groupOff = groupOff || this.states?.value?.includes(option.name);
      if (groupOff) return true;
    }

    return groupOff;
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
  onOptionClicked: (group?: any, option?: any, optionIndex?: number) => void;
  onSelectOpened: (componentData?: any) => void;
  onSelectClosed: (componentData?: any) => void;
}

export interface MatOptionsGroup {
  groupName: string;
  options: MatOptionInfo[];
  isSelected: boolean;
  isOpened: boolean;
  icon?: string;
}

export interface MatOptionInfo {
  name: string;
  isSelected: boolean;
  icon?: string;
}

export interface DropdownOptionsGroupsConfig {
  canCloseGroups: boolean;
  style?: DropdownOptionsGroupsStyle;
  maxSelectableGroups?: number;
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
