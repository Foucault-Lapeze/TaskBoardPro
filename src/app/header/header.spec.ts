import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter } from '@angular/router';

describe('Header', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the brand name "Taskboard Pro"', () => {
    const brandElement = fixture.nativeElement.querySelector('.navbar-brand');
    expect(brandElement.textContent).toContain('Taskboard Pro');
  });

  it('should have 3 navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(links.length).toBe(3);
  });

  it('should display correct text for links', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-link');

    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Taches');
    expect(links[2].textContent).toContain('A Propos');
  });
});
