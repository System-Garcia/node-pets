

export class PaginationDto {


    private constructor(
        public page: number,
        public limit: number
    ) {};


    public static create(page: number = 1, limit: number = 10 ): [string?, PaginationDto?] {

        if ( isNaN(page) || isNaN(limit)) return ['page and limit is not a number'];

        if ( page <= 0 ) return ['page and limit must be a number'];
        if ( limit <= 0 ) return ['limit must be greater than 0'];

        if ( limit > 50 ) return ['limit must be less than 50' ];

        return [undefined, new PaginationDto(page, limit)];

    }


}