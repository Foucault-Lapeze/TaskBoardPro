import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer Component', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should verify that currentYear is the actual year', () => {
    const realYear = new Date().getFullYear();
    expect(component.currentYear).toBe(realYear);
  });

  it('should display "Taskboard Pro" inside strong tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const strongTag = compiled.querySelector('strong');

    expect(strongTag?.textContent).toContain('Taskboard Pro');
  });

  it('should render the copyright text with the dynamic year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyrightSpan = compiled.querySelector('.text-muted');
    const currentYearStr = new Date().getFullYear().toString();

    expect(copyrightSpan?.textContent).toContain('Copyright ©');
    expect(copyrightSpan?.textContent).toContain(currentYearStr);
    expect(copyrightSpan?.textContent).toContain('Tous droits réservés');
  });
});
