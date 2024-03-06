import { prisma } from "../../../data/postgres";
import { CustomError, PaginationDto } from "../../../domain";
import { PermissionDatasource } from "../../../domain/datasources/permission.datasource";
import { CreatePermissionDto } from "../../../domain/dtos/permissions/create-permission.dto";
import { UpdatePermissionDto } from "../../../domain/dtos/permissions/update-permission.dto";
import { PermissionEntity } from "../../../domain/entities/permission.entity";
import { PaginatedPermissionResponse } from "../../../domain/interfaces/paginated-permission-res.interface";



export class PostgresPermissionDatasourceImpl implements PermissionDatasource{

    constructor(
        private readonly webServiceUrl: string,
    ) {}
    
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
            throw error;
        }

    }

    async getAll(paginationDto: PaginationDto): Promise<PaginatedPermissionResponse> {
        
        const { page, limit } = paginationDto;

        const skip = ( page - 1) * limit;

        const [ total, permissions ] = await Promise.all([
            prisma.permission.count(),
            prisma.permission.findMany({
                where: { isDeleted: false },
                skip: skip,
                take: limit,
            })
        ]);


        const nextPage =
            page * limit >= total
                ? null
                : `${this.webServiceUrl}/permissions?page=${ page + 1}&limit=${limit}`;
        
        const prevPage =
            page - 1 > 0
                ? `${this.webServiceUrl}/permissions?page=${ page - 1}&limit=${limit}`
                : null;
                
        
        return {
            page,
            limit,
            total,
            next: nextPage,
            prev: prevPage,
            permissions: permissions.map( permission => PermissionEntity.fromObject(permission)),
        }

    };

    async findById(id: number): Promise<PermissionEntity> {
        
       try {

        const permission = await prisma.permission.findUnique({
            where: { id, isDeleted: false },
        });

        if (!permission) throw CustomError.notFound(`Permission with id ${id} not found`);

        return PermissionEntity.fromObject(permission);

       } catch (error) {
            throw error;
       }
    };

    async updateById(updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        
        try {
            
            const { id } = updatePermissionDto;

            await this.findById(updatePermissionDto.id);

            const permission = await prisma.permission.update({
                where: { id, isDeleted: false },
                data: updatePermissionDto.values
            });

            return PermissionEntity.fromObject(permission);

        } catch (error) {
            throw error;
        }

    };

    async deleteById(id: number): Promise<PermissionEntity> {
        
        try {
            await this.findById(id);

            const permissionDeleted = await prisma.permission.update({
                data: { isDeleted: true },
                where: { id, isDeleted: false },
            });

            return PermissionEntity.fromObject(permissionDeleted);
        } catch (error) {
            throw error;
        }

    };

    async verifyPermissionExist(permissionId: number): Promise<boolean> {

        try {
            
            const permission = await prisma.permission.findUnique({
                where: {
                    id: permissionId,
                    isDeleted: false,
                }
            });

            if (!permission) return false;

            return true;

        } catch (error) {
            throw CustomError.internalServer();
        }

    }

}