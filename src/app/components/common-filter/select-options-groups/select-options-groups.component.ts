import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConsoleHelper } from 'src/shared/consoleHelper';
import { deepCopy } from 'src/shared/objectHelper';
import { generateUUID, replaceAll } from 'src/shared/stringHelper.model';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss'],
})
export class SelectOptionsGroupsComponent implements OnInit, AfterViewInit {
  @ViewChild('mySelect') mySelect: any;
  @Input() data: DropdownOptionsGroups = {} as DropdownOptionsGroups;
  states = new FormControl();

  selectPanel: any;

  latestScrollsTop: number[] = [0];

  placeholderText: string = '';

  /**Definisco se visualizzare i log o no */
  consoleHelper: ConsoleHelper = new ConsoleHelper({
    canShowLogs: false
  });

  constructor() {
  }

  ngOnInit(): void {
    this.checkInputData();
  }

  ngAfterViewInit(): void {
    if (this.data.config.canOpenOnComponentStart) this.mySelect.open();
    // TODO: fix di questo timeout!
    setTimeout(() => {
      this.checkGroups();
      this.applyDropdownHeightWhenOpened();
      this.applyCheckboxColor();
      this.mySelect.openedChange.subscribe(() => this.registerPanelScrollEvent());
      // Quando esise il pannello sul DOM, porto lo scroll a 0
      this.scrollTopMatPanel();
    }, 0);
  }

  // #region check input data

  /**Method checking input data */
  private checkInputData() {
    this.assignIds();
    this.validateInputData();
  }

  /**Method validating input data in order to avoid errors */
  validateInputData() {
    console.log('fire');
    if (this.data.groups == null) this.data.groups = [];
    if (this.data.groups.length === 0) return;
    this.data.groups.forEach((group: MatOptionsGroup) => {
      if(group.groupName == null) group.groupName = 'no_group_name';
      if (group.isSelected == null) group.isSelected = false;
      if (group.isOpened == null) group.isOpened = false;
      if (group.icon == null) group.icon = 'close';
      if (group.options == null) group.options = [];
      // Controllo le opzioni
      group.options.forEach((option: MatOptionInfo) => {
        if (option.name == null) option.name = 'no_name';
        if (option.isSelected == null) option.isSelected = false;
        if (option.icon == null) option.icon = 'close';
      });
    });

  }

  /**Method assgning an id to each group and each option. */
  assignIds(): void {
    this.data.groups.forEach(group => {
      group.id = group.id ?? generateUUID();
      group.options.forEach(option => {
        option.id = option.id ?? generateUUID();
      });
    });
  }

  // #endregion

  /**Method listening to all scrolls requests applied on the material select */
  registerPanelScrollEvent() {
    const panel = this.mySelect?.panel?.nativeElement;
    panel?.addEventListener('scroll', (event: any) => {
      this.latestScrollsTop.push(panel.scrollTop);
    });
  }

  // #region promises

  /**Method returning a promise listening to the material select panel
   * and returning it when ready on the page. */
  async getMaterialselectPanel() {
    const promise = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        let selectPanel = this.mySelect?.panel?.nativeElement;
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
    this.consoleHelper.log('this.states.value');
    this.consoleHelper.log(this.states.value);
    const scrolltopBck = deepCopy(
      this.latestScrollsTop[this.latestScrollsTop.length - 1]
    );
    this.selectPanel.scrollTop = scrolltopBck;
    group.isSelected = true;
    option.isSelected = !option.isSelected;
    if (!this.canCheckGroup(group)) this.checkGroup(group, false);
    // Se la configurazione prevede un limite massimo ai gruppi selezionati, deseleziono gli altri
    if (this.data.config.maxSelectableGroups != null) {
      const selGroupsCount = this.getSelectedGroupsCount() - 1;
      if (selGroupsCount > this.data.config.maxSelectableGroups) {
        // this.deselectAllGroups();
        group.isSelected = true;
        const grpOptions = group.options.map((row: MatOptionInfo) => row.id);
        // Deseleziono tutti i gruppi e le sue options tranne quelli ammessi
        const ammitted = this.states.value.filter((row: string) => grpOptions.includes(row));
        this.data.groups.forEach(group => {
          group.isSelected = false;
          group.options.forEach((option: MatOptionInfo) => {
            option.isSelected = false;
          });
        });
        this.states.setValue(ammitted);
        group.isSelected = true;
        option.isSelected = !option.isSelected;
      }
    }

    this.placeholderText = this.generatePlaceholderText(group);


    this.consoleHelper.log('this.optionsGroups');
    this.consoleHelper.log(this.data);
    this.data.onOptionClicked(group, option, index);
  }

  /**
   * Method generating the text of the placeholder
   * @param group
   * @param option
   */
  generatePlaceholderText(group: any): string {
    const labels: string[] = this.getLabelsFromIds(group);
    const placeholder: string = this.buildSelectPlaceholder(labels);

    return placeholder;
  }


  /**Method building the placeholder to show in the select when options are selected. */
  buildSelectPlaceholder(labels: string[]): string {
    if (labels == null) return '';
    let result = `${[...labels]}, `;
    result = replaceAll(',' ,', ',result)
    result = result.substring(0, result.length - 3);

    return result;
  }

  /**Method getting the labels associated with the specified ids. */
  private getLabelsFromIds(group: any) {
    const labels: string[] = [];
    for (const id of this.states.value) {
      const foundOption = group.options.find((option: any) => option.id === id);
      if (foundOption != null)
        labels.push(foundOption.name);
    }

    return labels;
  }

  /**Method managing an group click from the select. */
  public onGroupClicked(event: any, group: any) {
    let states = this.states.value;
    states = states ? states : [];
    if (event.checked) {
      // Se la configurazione prevede un limite massimo ai gruppi selezionati, deseleziono gli altri
      if (this.data.config.maxSelectableGroups != null) {
        if (this.getSelectedGroupsCount() > this.data.config.maxSelectableGroups) {
          this.deselectAllGroups();
          group.isSelected = true;
        }
      }
      // imposto a checked tutte le options del gruppo
      states.push(...group.options.map((row: MatOptionInfo) => row.id));
      group.options.forEach((option: MatOptionInfo) => {
        option.isSelected = true;
      });
    } else {
      // imposto ad unchecked tutte le options del gruppo
      group.options
        .map((row: MatOptionInfo) => row.id)
        .forEach((x: string) => states.splice(states.indexOf(x), 1));
      group.options.forEach((option: MatOptionInfo) => {
        option.isSelected = false;
      });
    }
    this.states.setValue(states);
    group.isSelected = event.checked;

    this.consoleHelper.log('this.optionsGroups');
    this.consoleHelper.log(this.data);
    this.consoleHelper.log('this.states.value')
    this.consoleHelper.log(this.states.value)

    this.data.onGroupClicked(group);
  }

  /**Method to deselect all the groups actually selected */
  deselectAllGroups() {
    return this.data.groups.forEach((group) => {
      let states = this.states.value;
      states = states ? states : [];
      group.isSelected = false;
      // Deselezione delle options degli altri gruppi
      group.options
        .map((row: MatOptionInfo) => row.id ?? '')
        .forEach((x: string) => states.splice(states.indexOf(x), 1));
    });
  }

  /**Method returning the number of selected groups */
  private getSelectedGroupsCount(): number {
    return this.data.groups.filter((row) => row.isSelected).length + 1;
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
    this.data.onSelectOpened();
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
    if (checkStatus) {
      let states = this.checkOptions(checkStatus, group.options);
      this.states.setValue(states);
    }
    group.options.forEach((option) => (option.isSelected = checkStatus));
  }

  private checkOptions(checkStatus: boolean, options: MatOptionInfo[]): string[] {
    let states = this.states.value;
    states = states ? states : [];
    // Attivo tutte le options specificate
    options.forEach((option) => {
      option.isSelected = true;
    });
    if (checkStatus)
      states.push(...options.map((option: MatOptionInfo) => option.id));

    return states;
  }

  /**Method iterating all groups in order to check the ones marked as "check" */
  checkGroups() {
    if (this.data.groups == null) return;
    this.data.groups.forEach((group) => {
      if (group?.isSelected) {
        this.checkGroup(group, true);
        this.placeholderText = this.generatePlaceholderText(group);
      }
      else {
        this.checkGroup(group, false);
      }
    });
  }

  /**Method making the select's height match to the specifications,
   * as the material input does not allow it by default.  */
  applyDropdownHeightWhenOpened() {
    if (this.data == null) return;
    if (this.data.config == null) return;
    if (this.data.config.style == null) return;
    if (this.data.config.style.whenOpened == null) return;
    this.getMaterialselectPanel().then((res: any) => {
      // E' sicuro che il pannello sia presente sul DOM.
      // Definisco manualmente l'altezza della tendina
      // TODO: usare res per cambiare lo stile del pannello
      const elements = document.querySelectorAll('.mat-select-panel');
      if (elements.length == 0) return;
      const first = elements[0] as HTMLElement;
      first.style.maxHeight =
        this.data.config.style?.whenOpened?.maxHeight ?? '';
    });
  }

  /**Method determinating if the group toggle shold turn on or not. */
  public canCheckGroup(group: any): boolean {
    let groupOff = false;
    for (const option of group.options) {
      groupOff = groupOff || this.states?.value?.includes(option.id);
      if (groupOff) return true;
    }

    return groupOff;
  }

  // #region still to implement

  /**Method making the select's height match to the specifications,
   * as the material input does not allow it by default.  */
  applyCheckboxColor() {
    if (this.data == null) return;
    if (this.data.config == null) return;
    if (this.data.config.style == null) return;
    if (this.data.config.style.whenOpened == null) return;
    if (this.data.config.style.whenOpened.checkbox == null) return;
    this.applyGroupsCheckboxColor();
    this.applyOptionsCheckboxColor();
  }

  applyOptionsCheckboxColor() {
    const classname = '.mat-pseudo-checkbox';
    // Definisco manualmente l'altezza della tendina
    const elements = document.querySelectorAll(classname);
    if (elements.length == 0) return;
    elements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.background = this.data?.config?.style?.whenOpened?.checkbox?.options.backgroundColor ?? ''; // Color from config.
    });
  }

  applyGroupsCheckboxColor() {
    const classname = '.mat-checkbox .mat-checkbox-frame';
    // Definisco manualmente l'altezza della tendina
    const elements = document.querySelectorAll(classname);
    if (elements.length == 0) return;
    elements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.background = this.data?.config?.style?.whenOpened?.checkbox?.groups.backgroundColor ?? ''; // Color from config.
    });
  }
  // #endregion

  //#endregion
}

export interface ComponentData {
  label?: FilterElement;
  icon?: FilterElement;
  data: DropdownOptionsGroups;
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
  id?: string;
  groupName: string;
  options: MatOptionInfo[];
  isSelected: boolean;
  isOpened: boolean;
  icon?: string;
}

export interface MatOptionInfo {
  id?: string;
  name: string;
  isSelected: boolean;
  icon?: string;
}

export interface DropdownOptionsGroupsConfig {
  canOpenOnComponentStart: boolean;
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
  checkbox?: CheckboxStyle;
}

export interface CheckboxStyle {
  groups?: any;
  options?: any;
}

export interface FilterElement {
  content: string;
  style?: any;
}
