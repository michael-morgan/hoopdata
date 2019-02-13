import { Component, OnInit } from '@angular/core';
import ImageResize from 'resize-image-map';

@Component({
  selector: 'app-shooting',
  templateUrl: './shooting.page.html',
  styleUrls: ['./shooting.page.scss'],
})
export class ShootingPage implements OnInit {

  private spot = '';
  private spots = {
    'lCorner1': 'Left Corner 1',
    'lCorner2': 'Left Corner 2',
    'lCorner3': 'Left Corner 3',
    'lCorner4': 'Left Corner 4',
    'lCorner5': 'Left Corner 5',
    'lCorner6': 'Left Corner 6',

    'rCorner1': 'Right Corner 1',
    'rCorner2': 'Right Corner 2',
    'rCorner3': 'Right Corner 3',
    'rCorner4': 'Right Corner 4',
    'rCorner5': 'Right Corner 5',
    'rCorner6': 'Right Corner 6',

    'lWing1': 'Left Wing 1',
    'lWing2': 'Left Wing 2',
    'lWing3': 'Left Wing 3',
    'lWing4': 'Left Wing 4',
    'lWing5': 'Left Wing 5',
    'lWing6': 'Left Wing 6',
    'lWing7': 'Left Wing 7',

    'rWing1': 'Right Wing 1',
    'rWing2': 'Right Wing 2',
    'rWing3': 'Right Wing 3',
    'rWing4': 'Right Wing 4',
    'rWing5': 'Right Wing 5',
    'rWing6': 'Right Wing 6',
    'rWing7': 'Right Wing 7',

    'mTop1': 'Middle Top 1',
    'mTop2': 'Middle Top 2',
    'mTop3': 'Middle Top 3',
    'mTop4': 'Middle Top 4',
    'mTop5': 'Middle Top 5',
    'mTop6': 'Middle Top 6',
    'mTop7': 'Middle Top 7'
  };
  private makes = 0;
  private attempts = 0;

  constructor() { }

  ngOnInit() {
    const imageResize = new ImageResize({
      width: 1605,
      height: 1494,
      element: '#courtImage'
    });
  }

  courtClick(event) {
    console.dir(event);
    const target = event.target || event.srcElement || event.currentTarget;
    const id = target.attributes.id.value;
    this.spot = id;
    console.log(`Spot: ${id}`);

    const marker = document.querySelector('#marker');
    if (marker) {
      marker.parentNode.removeChild(marker);
    }
    const style = `
      position: absolute;
      top: ${(event.pageY - 51)}px;
      left: ${(event.pageX - 7)}px;
      width: 15px;
      height: 15px;
      background: #006bff;
      border-radius: 10px;
    `;
    document.querySelector('#content').insertAdjacentHTML('beforeend', `<div id="marker" style="${style}"></div>`);
  }

  changeShot(type, modifier) {
    if (type === 'M') {
      if (modifier === '+') {
        this.makes += 1;
      }
    } else if (type === 'A') {
      if (modifier === '+') {
        this.attempts += 1;
      }
    }
  }
}
