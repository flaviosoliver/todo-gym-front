import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkTheme = false;

  constructor() {}

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('darkMode', this.isDarkTheme);
    if (this.isDarkTheme) {
      window.localStorage.setItem('theme', 'darkMode');
    } else {
      window.localStorage.setItem('theme', 'lightMode');
    }
  }

  setSelectedTheme(theme: string) {
    console.log('setting selected theme', theme);
    let checkTheme = window.localStorage.getItem('theme');
    console.log('check theme', checkTheme);
    this.toggleTheme();
  }

  isDark(): boolean {
    return this.isDarkTheme;
  }
}
