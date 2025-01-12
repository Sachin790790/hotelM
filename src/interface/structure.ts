export interface Room {
  roomNo: string;
  isBooked: boolean;
}

export interface Floor {
  floorNo: number;
  rooms: Room[];
}

export const HOTEL_STRUCTURE: Floor[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    floorNo: i + 1,
    rooms: Array.from({ length: i == 9 ? 7 : 10 }, (_, j) => ({
        roomNo: i == 9 ? `100${j + 1}` : `${i + 1}${(j + 1).toString().padStart(2, '0')}`,
        isBooked: false,
    })),
  }))
];
