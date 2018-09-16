import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "./components/components.module";
import { ImageDirective } from "./image.directive";
import { RouterModule } from "@angular/router";

const MODS = [CommonModule, ComponentsModule,RouterModule];

@NgModule({
  imports: [...MODS],
  declarations: [ImageDirective],
  exports: [...MODS,ImageDirective]
})
export class SharedModule {}
