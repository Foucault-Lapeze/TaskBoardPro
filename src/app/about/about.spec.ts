import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { About } from './about';

describe('About Component', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Comme c'est un Standalone Component, on l'importe ici
      imports: [About]
    })
      .compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial version "1.0.0"', () => {
    expect(component.appVersion).toEqual('1.0.0');
  });

  it('should have a lastUpdate date', () => {
    expect(component.lastUpdate).toBeDefined();
    expect(component.lastUpdate instanceof Date).toBe(true);
  });

  it('should display the correct title "Qui sommes-nous ?"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Qui sommes-nous ?');
  });

  it('should verify that Taskboard Pro is mentioned in the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstParagraph = compiled.querySelector('.about-text');
    expect(firstParagraph?.textContent).toContain('Taskboard Pro');
  });

  it('should display contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listContent = compiled.querySelector('.about-info')?.textContent;

    expect(listContent).toContain('12 rue de l’Innovation');
    expect(listContent).toContain('Paris');
    expect(listContent).toContain('France');
  });
});
