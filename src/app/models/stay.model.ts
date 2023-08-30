import { Review } from "./review.model"

export interface Stay {
    _id: string
    name: string
    type: string
    imgUrls: Array<string>
    price: number
    summary: string
    capacity: number
    amenities: string
    bathrooms: number
    bedrooms: number
    beds: number
    roomType: string
    host: {
        _id: string,
        fullname: string,
        imgUrl: string
    }
    loc: {
        country: string,
        countryCode: string,
        city: string,
        address: string,
        lat: number,
        lan: number
    }
    reviews: Array<Review>
    likedByUsers: Array<string>
}

export interface FilterBy {
    
}