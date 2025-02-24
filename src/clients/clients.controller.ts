import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindClientsPaginatedDto } from './dto/find-clients-paginated.dto';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(
    @Query()
    query: {
      page?: string;
      itemsPerPage?: string;
      isSelected?: string;
    },
  ) {
    const queryParams: FindClientsPaginatedDto = {
      page: Number(query?.page) || 1,
      itemsPerPage: Number(query?.itemsPerPage) || 8,
      isSelected: query?.isSelected === 'true' ? true : false,
    };
    return this.clientsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @HttpCode(204)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @HttpCode(204)
  @Patch(':id/selection')
  updateIsSelected(
    @Param('id') id: string,
    @Body('isSelected') isSelected: boolean,
  ) {
    return this.clientsService.updateIsSelected(+id, isSelected);
  }

  @HttpCode(204)
  @Patch('selection')
  updateManyIsSelected(@Body('isSelected') isSelected: boolean) {
    return this.clientsService.updateManyIsSelected(isSelected);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
