import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ng-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatProgressSpinnerModule],
  host: {
    '[class]': '["h-full", "w-full", "top-0", "left-0"]',
    '[class.absolute]': 'local',
    '[class.fixed]': '!local',
    '[class.hidden]': '!loading',
    '[class.block]': 'loading',
  },
})
export class LoaderComponent implements OnInit, OnDestroy {
  /**
   * Whether is loader relative as part of component, or situated as overlay.
   * Default configuration is local loader.
   * @default true
   */
  @Input() local = true;
  /**
   * Whether is loader visible.
   * Default status is hidden.
   * @default false
   */
  @Input() loading = false;

  private readonly subscription = new Subject();
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly loadingService = inject(LoadingService);

  ngOnInit() {
    if (this.local) {
      return;
    }

    // This is for service
    this.loadingService.isLoading$.pipe(takeUntil(this.subscription)).subscribe({
      next: (loading) => {
        this.loading = loading;
        this.cdr.markForCheck();
      },
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
