import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() label: string = ''
  @Input() options: any[] = []
  @Output() selectedValue = new EventEmitter()

  onChange(event: any) {
    this.selectedValue.emit(event)
  }

}
