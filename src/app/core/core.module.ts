import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatModule } from '../mat.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(' CoreModule is already loaded. Import it only in the AppModule.');
    }
  }

}
