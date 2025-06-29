import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ComboboxComponent } from "../shared/combobox/combobox.component";
import { UserService } from '../../core/services/user.service';
import { SessionstorageService } from '../../core/services/sessionstorage.service';
import { UserDTO } from '../../core/model/UserDTO';
import { User } from '../../core/model/User';

@Component({
  selector: 'app-user',
  imports: [ComboboxComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly sessionstorageService = inject(SessionstorageService);
  private readonly destroyRef = inject(DestroyRef);

  user = signal<User[]>([]);
  selectedOption = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.loadCombobox();
  }

  loadCombobox(){
    const user = this.sessionstorageService.getItem<UserDTO>('user_info');
    if (user) {
      const subscription = this.userService.fetchAllUsers(user.fK_CustomerId ?? 0).subscribe({
        next: (data) => {
          this.user.set(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.destroyRef.onDestroy(() => subscription);
    }
  }

  bindGrid(option: number | undefined){
    this.selectedOption.set(option);
  }
}
