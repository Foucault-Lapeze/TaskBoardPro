import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header, a router-outlet and a footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const header = compiled.querySelector('app-header');
    expect(header).toBeTruthy();

    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();

    const footer = compiled.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should wrap content in app-layout and main content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const layout = compiled.querySelector('.app-layout');
    expect(layout).toBeTruthy();

    const main = compiled.querySelector('main.content');
    expect(main).toBeTruthy();
  });
});
