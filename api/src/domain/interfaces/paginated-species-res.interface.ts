import { SpeciesEntity } from "../entities/species.entity";

export interface PaginatedSpeciesResponse {
  page: number;
  limit: number;
  total: number;
  next: string | null;
  prev: string | null;
  species: SpeciesEntity[];
}
