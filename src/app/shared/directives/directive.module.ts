import { NgModule } from '@angular/core';
import { CodeValidatorDirective } from './codeeditor/code-validator.directive';
import { ButtonLoaderDirective } from './button/button-loader.directive';
import { ContentLoadingDirective } from './content-loading.directive';

const directives = [
  CodeValidatorDirective,
  ButtonLoaderDirective,
  ContentLoadingDirective,
];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class SharedDirectiveModule {}
