import {gql} from "@apollo/client";


export const GET_ABOUTS = gql`
    query abouts ($page: Int) {
        abouts (page: $page) {
           data {
               id,
               text,
               title
           },
            paginatorInfo {
                total
                currentPage
                hasMorePages
            }
        }
    }
`;