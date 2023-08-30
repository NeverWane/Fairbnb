import { User } from "./user.model"

export interface Review {
    at: string | number | Date
    by: Partial<User>
    txt: string
    rate: Rating
}

export interface Rating {
    [key: string]: number
    // Cleanliness: number
    // Communication: number
    // "Check-in": number
    // Accuracy: number
    // Location: number
    // Value: number
}