// NOTE: If updating values update in both
export enum ShowSeatStatus {
  Available = "Available",
  Booked = "Booked",
  Unavailable = "Unavailable",
}

export const showSeatStatus = ["Available", "Booked", "Unavailable"] as const;

export enum BookingStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export const bookingStatus = ["Pending", "Completed", "Failed"] as const;
