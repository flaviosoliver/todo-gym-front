import { Component, OnInit } from '@angular/core';
import { ThemeService } from './modules/shared/service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-gym-front';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    let theme = window.localStorage.getItem('theme');
    if (theme) {
      this.themeService.setSelectedTheme(theme);
    }
  }
}
