import { Component } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  sliderOptions={
    allowSlidePrev:false,
    allowSlideNext:false
  }
  constructor(public dataLocal:DatalocalService) {}

}
