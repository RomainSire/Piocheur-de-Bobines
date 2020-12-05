import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigation', () => {
    it('should exist one navigation', () => {
      const navigations = fixture.debugElement.queryAll(By.css('nav'));
      expect(navigations.length).toBe(1);
    });

    describe('navigation visibility', () => {
      it('should contain a navigation without the visible class', () => {
        const navElement = fixture.debugElement.query(By.css('#navigation'));
        const nav: HTMLDivElement = navElement.nativeElement;
        expect(nav.classList.contains('navigation__visible')).toBeFalse();
      });

      it('should add the visible class when the onOpenNav method is called', () => {
        component.onOpenNav();
        const navElement = fixture.debugElement.query(By.css('#navigation'));
        const nav: HTMLDivElement = navElement.nativeElement;
        expect(nav.classList.contains('navigation__visible')).toBeTrue();
      });

      it('should remove the visible class when the onCloseNav method is called', () => {
        const event = new MouseEvent('click');
        component.onCloseNav(event);
        const navElement = fixture.debugElement.query(By.css('#navigation'));
        const nav: HTMLDivElement = navElement.nativeElement;
        expect(nav.classList.contains('navigation__visible')).toBeFalse();
      });
    });

    describe('execute navigation methods on clicks', () => {
      it('should execute the onOpenNav method when the burger icon is clicked', fakeAsync(() => {
        spyOn(component, 'onOpenNav');
        const burgerIconElement = fixture.debugElement.query(By.css('#burgerIcon'));
        const burgerIcon: HTMLDivElement = burgerIconElement.nativeElement;
        burgerIcon.click();
        tick();
        expect(component.onOpenNav).toHaveBeenCalled();
      }));

      it('should execute the onCloseNav method when the close icon is clicked', () => {
        spyOn(component, 'onCloseNav');
        const closeNavIconElement = fixture.debugElement.query(By.css('#closeNavIcon'));
        closeNavIconElement.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(component.onCloseNav).toHaveBeenCalled();
      });

      it('should execute the onCloseNav method when one of the navigation link is clicked', () => {
        spyOn(component, 'onCloseNav');
        const navigationLinks = fixture.debugElement.queryAll(By.css('#navigation ul a'));
        for (let i = 0; i < navigationLinks.length; i++) {
          const navLink = navigationLinks[i];
          navLink.triggerEventHandler('click', {});
          fixture.detectChanges();
          expect(component.onCloseNav).toHaveBeenCalledTimes(i + 1);
        }
      });

      it('should execute preventDefault when the onCloseNav method is called', () => {
        const event = new MouseEvent('click');
        spyOn(event, 'preventDefault');
        component.onCloseNav(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });

    });
  });
});
