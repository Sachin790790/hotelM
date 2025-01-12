import { Component, Input } from '@angular/core';
import { Floor } from 'src/interface/structure';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent {
  @Input() hotel: Floor[] = [];
}
