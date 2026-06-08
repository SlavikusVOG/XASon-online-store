import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@shared/components';

@Component({
  selector: 'xas-main-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
