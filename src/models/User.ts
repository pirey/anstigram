interface Geo {
  lat: string
  lng: string
}

interface UserAddress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface UserCompany {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
  company: UserCompany
}

