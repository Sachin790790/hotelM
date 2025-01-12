import { Component } from '@angular/core';
import { HOTEL_STRUCTURE,Floor } from 'src/interface/structure';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css']
})
export class RoomBookingComponent {
  hotel: Floor[] = JSON.parse(JSON.stringify(HOTEL_STRUCTURE));
  roomsToBook: number = 0;
  bookedRooms: string[] = [];
  error: string = '';

  bookRooms(): void {
    if (this.roomsToBook < 1 || this.roomsToBook > 5) {
      this.error = 'You can book between 1 and 5 rooms only.';
      this.bookedRooms = []
      return;
    }

    this.error = '';
    const availableRooms = this.getAvailableRooms();
    const booking = this.findBooking(availableRooms, this.roomsToBook);

    if (booking) {
      booking.forEach((room) => {
        const [floor] = this.hotel.filter((f) =>
          f.rooms.some((r) => r.roomNo === room)
        );
        const roomObj = floor.rooms.find((r) => r.roomNo === room);
        if (roomObj) roomObj.isBooked = true;
      });
      this.bookedRooms = booking;
    } else {
      this.error = 'Not enough rooms available.';
    }
  }


  resetBooking(): void {
    this.hotel = JSON.parse(JSON.stringify(HOTEL_STRUCTURE));
    this.bookedRooms = [];
    this.error = '';
  }

  generateRandomBooking(): void {
    if (this.roomsToBook < 1 || this.roomsToBook > 5) {
      this.error = 'You can book between 1 and 5 rooms only.';
      this.bookedRooms = []
      return;
    }
    const availableRooms = this.getAvailableRooms();
    let bookings
    let randomFloor = Math.floor(Math.random()*10) + 1

    if (availableRooms[randomFloor].length >= this.roomsToBook) {
      bookings =  availableRooms[randomFloor].slice(0, this.roomsToBook);
    }

    if (bookings) {
      bookings.forEach((room) => {
        const [floor] = this.hotel.filter((f) =>
          f.rooms.some((r) => r.roomNo === room)
        );
        const roomObj = floor.rooms.find((r) => r.roomNo === room);
        if (roomObj) roomObj.isBooked = true;
      });
      this.bookedRooms = bookings;
    } else {
      this.error = 'Not enough rooms available.';
    }
  }

  private getAvailableRooms(): { [floor: number]: string[] } {
    const available: { [floor: number]: string[] } = {};
    this.hotel.forEach((floor) => {
      available[floor.floorNo] = floor.rooms
        .filter((room) => !room.isBooked)
        .map((room) => room.roomNo);
    });
    return available;
  }

  private findBooking(
    availableRooms: { [floor: number]: string[] },
    numberOfRooms: number
  ): string[] | null {
    for (const floor in availableRooms) {
      if (availableRooms[floor].length >= numberOfRooms) {
        return availableRooms[floor].slice(0, numberOfRooms);
      }
    }
    // Spanning across floors
    const result: string[] = [];
    for (const floor in availableRooms) {
      result.push(...availableRooms[floor]);
      if (result.length >= numberOfRooms) return result.slice(0, numberOfRooms);
    }
    return null;
  }
}
