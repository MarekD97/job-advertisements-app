export interface JobItem {
    id?: string,
    title: string,
    category: string,
    isActive: boolean,
    isAgeOfMajorityRequired: boolean,
    expectedPrice: string,
    detail: string,
    image: {
        url: string,
    },
    createdAt?: Time | Date,
    updatedAt?: Time | Date,
    userAccountId: string,
    author?: AuthorItem,
}

export interface AuthorItem {
    firstname: string,
    lastname: string,
    image: {
        url: string,
    },
    phoneNumber: string,
    address: AddressItem,
}

export interface AddressItem {
    city: string,
    country: string,
    postcode: string,
    streetName: string,
    streetNumber: string,
}

export interface SimpleNameItem {
    id: number,
    name: string,
}

interface Time {
    seconds: number,
    nanoseconds: number,
}