import { PetEntity } from "../entities/pet.entity";

export interface PaginatedPetsResponse {
    page: number;
    limit: number;
    total: number;
    next: string | null;
    prev: string | null;
    pets: PetEntity[];
}