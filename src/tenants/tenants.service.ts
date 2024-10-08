import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class TenantsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTenantDto: Prisma.TenantCreateInput) {
    return this.databaseService.tenant.create({ data: createTenantDto });
  }

  findAll() {
    return this.databaseService.tenant.findMany();
  }

  findOne(nullifierHash: string) {
    try {
      return this.databaseService.tenant.findUniqueOrThrow({
        where: { nullifierHash },
      });
    } catch (error) {
      throw new HttpException("User does not exist.", HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateTenantDto: Prisma.TenantUpdateInput) {
    return this.databaseService.tenant.update({
      data: updateTenantDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.databaseService.tenant.delete({ where: { id } });
  }
}
