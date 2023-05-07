import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() loggedInUser?: firebase.default.User | null;
  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    if (logout) {
      this.onLogout.emit(true);
    }
    this.onCloseSidenav.emit(true);
  }
}
