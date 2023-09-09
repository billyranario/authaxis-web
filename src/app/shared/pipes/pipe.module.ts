import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldValidatorPipe } from './';

const pipes = [FieldValidatorPipe];

@NgModule({
  declarations: [...pipes],
  providers: [...pipes],
  imports: [CommonModule],
  exports: [...pipes],
})
export class PipeModule {}
