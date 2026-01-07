import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {Header} from '../header/header';


describe('Header Component', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the brand name "Taskboard Pro" with correct link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandElement = compiled.querySelector('.navbar-brand');

    expect(brandElement).toBeTruthy();
    expect(brandElement?.textContent).toContain('Taskboard Pro');

    expect(brandElement?.getAttribute('href')).toEqual(null);
  });

  it('should have 3 navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-link'));

    expect(links.length).toBe(3); // Home, Taches, A Propos
  });

  it('should have correct links and labels', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-link'));

    const homeLink = links[0].nativeElement;
    expect(homeLink.textContent).toContain('Home');
    expect(homeLink.getAttribute('href')).toEqual('/');

    const tasksLink = links[1].nativeElement;
    expect(tasksLink.textContent).toContain('Taches');
    expect(tasksLink.getAttribute('href')).toEqual('/tasks');

    const aboutLink = links[2].nativeElement;
    expect(aboutLink.textContent).toContain('A Propos');
    expect(aboutLink.getAttribute('href')).toEqual('/about');
  });

  it('should render the mobile menu toggler button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggler = compiled.querySelector('.navbar-toggler');

    expect(toggler).toBe(null);
  });
});
