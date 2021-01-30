import { gql } from '@apollo/client';

export const CREATE_HOTEL = gql`
mutation createHotel(
    $data: HotelCreateInput!
  )
  {
    createHotel(
        data: $data
    )
    {
        id
        name
        description
        rooms
        amenities
        website
        phone
        photos{
           url
        }
    }
  }
`;

export const EDIT_HOTEL = gql`
mutation updateHotel($data: HotelUpdateInput!,$id: HotelWhereUniqueInput!){
    updateHotel(data: $data,where: $id){
      id
      name
      description
      amenities
      website
      rooms
      phone
      photos{
          url
      }
    }
  }
`;

export const DELETE_HOTEL = gql`
mutation deleteHotel($id: ID!){
  deleteHotel(where: {
    id: $id
  }){
    id
    name
  }
}
`

export const CREATE_DESTINATION = gql`
mutation createDestination($data: DestinationCreateInput!){
createDestination(data: $data){
  id
  name
  location
  description
  image{
    url
  }
}
}
`;

export const EDIT_DESTINATION = gql`
mutation updateDestination($data: DestinationUpdateInput!,$id: DestinationWhereUniqueInput!){
    updateDestination(data: $data,where: $id)
    {
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

export const DELETE_DESTINATION = gql`
mutation deleteDestination($id: ID!){
    deleteDestination(where:{
        id: $id
    })
    {
        id
        name
    }
}
`