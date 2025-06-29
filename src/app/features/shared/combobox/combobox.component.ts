import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/model/User';

@Component({
  selector: 'app-combobox',
  imports: [FormsModule],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.css'
})
export class ComboboxComponent implements OnInit {
  inputValue = signal<string>('');
  showDropdown = signal<boolean>(false);
  selectedOptionId = signal<number | undefined>(undefined);
  selectedOption = output<number | undefined>();

  userList = input.required<User[]>();
  filteredOptions: User[] = [];

  ngOnInit(): void {
    this.filteredOptions = this.userList();
  }

  filterOptions() {
    const val = this.inputValue().toLowerCase();
    this.filteredOptions = this.userList().filter(
      option => option.firstName.toLowerCase().includes(val) || option.lastName.toLowerCase().includes(val) || option.email.toLowerCase().includes(val)
    );
  }

  selectOption(pK_UserId?: number): void {
    if (pK_UserId == null) return;

    const option = this.userList().find(o => o.pK_UserId === pK_UserId);
    if (!option) return;

    const { firstName, lastName, email } = option;
    this.inputValue.set(`${firstName} ${lastName} (${email})`);
    this.showDropdown.set(false);
    this.selectedOptionId.set(option.pK_UserId);
  }

  onBlur() {
    // Delay to allow click to register
    setTimeout(() => {
      this.showDropdown.set(false);
    }, 150);
  }

  findData() {
    this.selectedOption.emit(this.selectedOptionId());
  }

  resetCombo() {
    this.inputValue.set('');
    this.showDropdown.set(false);
    this.selectedOptionId.set(undefined);
    this.findData();
  }
}
