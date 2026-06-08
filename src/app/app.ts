import { TuiRoot } from '@taiga-ui/core';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'xas-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('XASon-online-store');
}
