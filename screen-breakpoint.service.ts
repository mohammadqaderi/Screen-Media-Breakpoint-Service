import {Injectable} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';

export enum Breakpoints {
  'XS' = 'xs',
  'SM' = 'sm',
  'MD' = 'md',
  'LG' = 'lg',
  'XL' = 'xl'
}

@Injectable()
export class ScreenBreakpointService {
  /* extra small mobiles */
  private readonly xsBreakpoint = ['(max-width:575.98px)'];
  /* small and medium mobiles */
  private readonly smBreakpoint = ['(min-width:576px) and (max-width:767.98px)'];
  /* tablets */
  private readonly mdBreakpoint = ['(min-width:768px) and (max-width:991.98px)'];
  /* laptops and desktops medium ones*/
  private readonly lgBreakpoint = ['(min-width:992px) and (max-width:1199.98px)'];
  /* laptops and desktops large ones */
  private readonly xlBreakpoint = '(min-width:1200px)';

  private screenSizeObserver = new BehaviorSubject<Breakpoints[]>([Breakpoints.XS]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers() {
    this.breakpointObserver.observe(this.xsBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next([Breakpoints.XS]);
      }
    });
    this.breakpointObserver.observe(this.smBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next([Breakpoints.XS, Breakpoints.SM]);
      }
    });
    this.breakpointObserver.observe(this.mdBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next([Breakpoints.MD]);
      }
    });
    this.breakpointObserver.observe(this.lgBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next([Breakpoints.LG]);
      }
    });
    this.breakpointObserver.observe(this.xlBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next([Breakpoints.LG, Breakpoints.XL]);
      }
    });
  }

  // you can listen to the changes on the match media observer
  public sizeAsObservable() {
    return this.screenSizeObserver.asObservable()
  }

  public isDesktop() {
    return this.screenSizeObserver.value.includes(Breakpoints.XL) ||
      this.screenSizeObserver.value.includes(Breakpoints.LG)
  }

  public isMobile() {
    return this.screenSizeObserver.value.includes(Breakpoints.XS)
      || this.screenSizeObserver.value.includes(Breakpoints.SM)
  }

  public isTablet() {
    return this.screenSizeObserver.value.includes(Breakpoints.MD)
  }


}
