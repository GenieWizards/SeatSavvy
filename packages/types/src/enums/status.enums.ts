export enum ShowSeatStatus {
  Available = "Available",
  Booked = "Booked",
  Unavailable = "Unavailable",
}

export const showSeatStatus = ["Available", "Booked", "Unavailable"] as const;
