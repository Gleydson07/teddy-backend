import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';
import { FindClientsPaginatedDto } from './dto/find-clients-paginated.dto';
import { ResponseFindClientsPaginatedDto } from './dto/response-find-clients-paginated.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>,
  ) {}

  create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    try {
      const created = this.clientsRepository.create(createClientDto);
      return this.clientsRepository.save(created);
    } catch (error) {
      console.error(error.message);
      throw new Error('Falha ao criar cliente.');
    }
  }

  async findAll(
    query: FindClientsPaginatedDto,
  ): Promise<ResponseFindClientsPaginatedDto> {
    const { page, itemsPerPage, isSelected } = query;

    const queryBuilder = this.clientsRepository
      .createQueryBuilder('clients')
      .take(itemsPerPage)
      .orderBy('clients.id', 'DESC')
      .skip((page - 1) * itemsPerPage);

    if (typeof isSelected === 'boolean') {
      queryBuilder.where('is_Selected = :isSelected', {
        isSelected: isSelected,
      });
    }

    const [results, total] = await queryBuilder.getManyAndCount();

    const pageParam = Number(page);
    const lastPage = Math.ceil(total / itemsPerPage);

    return {
      data: results,
      pagination: {
        currentPage: pageParam,
        previousPage: pageParam > 1 && lastPage > 1 ? pageParam - 1 : null,
        nextPage: pageParam < lastPage - 1 ? pageParam + 1 : null,
        firstPage: pageParam <= 2 ? null : 1,
        lastPage: pageParam >= lastPage ? null : lastPage,
        itemsPerPage: itemsPerPage,
        totalItems: total,
      },
    };
  }

  findOne(id: number): Promise<ClientEntity> {
    return this.clientsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      await this.clientsRepository.save({
        id: id,
        ...updateClientDto,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error('Falha ao atualizar cliente.');
    }
  }

  async updateIsSelected(id: number, isSelected: boolean) {
    try {
      await this.clientsRepository.save({
        id: id,
        isSelected: isSelected,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error('Falha ao alterar status de seleção do cliente.');
    }
  }

  async updateManyIsSelected(isSelected: boolean) {
    try {
      await this.clientsRepository.update(
        { isSelected: !isSelected },
        { isSelected },
      );
    } catch (error) {
      console.error(error.message);
      throw new Error(
        'Falha ao alterar status de seleção de todos os cliente.',
      );
    }
  }

  async remove(id: number) {
    try {
      const client = await this.clientsRepository.findOne({ where: { id } });

      if (client) {
        await this.clientsRepository.remove(client);
      }
    } catch (error) {
      console.error(error.message);
      throw new Error('Falha ao remover cliente.');
    }
  }
}
