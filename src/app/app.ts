import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Header} from './header/header';
import {Footer} from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule, Header, Footer],
  imports: [RouterOutlet, CommonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}
