import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-options-groups',
  templateUrl: './select-options-groups.component.html',
  styleUrls: ['./select-options-groups.component.scss']
})
export class SelectOptionsGroupsComponent implements OnInit {
  isExpandCategory: boolean[] = [];
  states = new FormControl();

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
