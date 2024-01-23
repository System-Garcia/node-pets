import { prisma } from "../../../data/postgres";
import { CustomError, PaginationDto } from "../../../domain";
import { PermissionDatasource } from "../../../domain/datasources/permission.datasource";
import { CreatePermissionDto } from "../../../domain/dtos/permissions/create-permission.dto";
import { UpdatePermissionDto } from "../../../domain/dtos/permissions/update-permission.dto";
import { PermissionEntity } from "../../../domain/entities/permission.entity";
import { PaginatedPermissionResponse } from "../../../domain/interfaces/paginated-permission-res.interface";



export class PostgresPermissionDatasourceImpl implements PermissionDatasource{
    
    async create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        
        const { name } = createPermissionDto;

        try {
            
            const permissionExist = await prisma.permission.findFirst({
                where: {
                    name
                }
            });

            if (permissionExist) throw CustomError.badRequest('permission is already exists');

            const permission = await prisma.permission.create({
                data: {
                    ...createPermissionDto,
                },
            });

            return PermissionEntity.fromObject(permission);

        } catch (error) {
            throw CustomError.internalServer();
        }

    }
    async getAll(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<PermissionEntity> {
        throw new Error("Method not implemented.");
    }
    async updateById(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: number): Promise<PermissionEntity> {
        throw new Error("Method not implemented.");
    }


    async verifyPermissionExist(permissionId: number): Promise<boolean> {

        try {
            
            const permission = await prisma.permission.findUnique({
                where: {
                    id: permissionId
                }
            });

            if (!permission) return false;

            return true;

        } catch (error) {
            throw CustomError.internalServer();
        }

    }

}