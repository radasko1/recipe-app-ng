import { NgModule } from '@angular/core';
import { LocalizedTitlePipe } from './pipes/localized-title.pipe';

@NgModule({
  declarations: [LocalizedTitlePipe],
  imports: [],
  exports: [LocalizedTitlePipe],
  providers: [],
})
export class SharedModule {}
