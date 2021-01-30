import { gql } from '@apollo/client';

export const FETCH_ASSETS = gql`
{
  assets{
    id
    url
  }
}
`
export const FETCH_HOTELS = gql`
{
    hotels(orderBy: createdAt_DESC)
    {
        createdAt
        id
        name
        website
        description
        photos 
        {
            id
            url
        }
    }
}
`

export const FETCH_HOTEL = gql`
query gethotel($id: ID!)
{
  hotel(where:{
    id: $id
  }){
    id
    name
    description
    rooms
    phone
    website
    amenities
    photos{
        id
        url
    }
  }
}
`

export const FETCH_DESTINATIONS = gql`
{
destinations{
 id
 name
 location
 description
 image{
   url
 }
}
}
`
export const FETCH_DESTINATION = gql`
query getdesination($id: ID!){
  destination(where: {
    id: $id
  }){
    id
    name
    location
    description
    image{
      url
    }
  }
}
`