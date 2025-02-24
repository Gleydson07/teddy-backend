import { ClientEntity } from 'src/database/entities/client.entity';

export class ResponseFindClientsPaginatedDto {
  data: ClientEntity[];
  pagination: {
    firstPage: number | null;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    lastPage: number | null;
    totalItems: number;
    itemsPerPage: number;
  };
}
