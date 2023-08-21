import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.scss'],
})
export class SelectAvatarComponent implements OnInit {
  @Output() avatarSelected = new EventEmitter<string>();

  selectedAvatar: string = '';
  avatarList: string[] = [
    '01.svg',
    '02.svg',
    '03.svg',
    '04.svg',
    '05.svg',
    '06.svg',
    '07.svg',
    '08.svg',
    '09.svg',
    '10.svg',
    '11.svg',
    '12.svg',
    '13.svg',
    '14.svg',
    '15.svg',
    '16.svg',
    '17.svg',
    '18.svg',
    '19.svg',
    '20.svg',
    '21.svg',
    '22.svg',
    '23.svg',
    '24.svg',
    '25.svg',
    '26.svg',
    '27.svg',
    '28.svg',
    '29.svg',
    '30.svg',
    '31.svg',
    '32.svg',
    '33.svg',
    '34.svg',
    '35.svg',
    '36.svg',
  ];

  constructor() {}

  ngOnInit() {}

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
    this.avatarSelected.emit(avatar);
  }
}
