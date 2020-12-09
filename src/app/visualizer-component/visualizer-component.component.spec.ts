import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerComponentComponent } from './visualizer-component.component';

describe('VisualizerComponentComponent', () => {
  let component: VisualizerComponentComponent;
  let fixture: ComponentFixture<VisualizerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
