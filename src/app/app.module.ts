import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizerComponentComponent } from './visualizer-component/visualizer-component.component';
import { SortingAlgorithmsService } from './sorting-algorithms.service';

@NgModule({
  declarations: [AppComponent, VisualizerComponentComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  providers: [SortingAlgorithmsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
