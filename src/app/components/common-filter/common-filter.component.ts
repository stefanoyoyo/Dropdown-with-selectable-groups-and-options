import { Component, Input, OnInit } from '@angular/core';
import { ComponentData } from './select-options-groups/select-options-groups.component';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss']
})
export class CommonFilterComponent implements OnInit {

  @Input() componentData: ComponentData = {} as ComponentData;

  constructor() { }

  ngOnInit(): void {
  }

}
