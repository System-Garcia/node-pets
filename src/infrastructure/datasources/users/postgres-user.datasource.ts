import { BcryptAdapter } from "../../../config/bcrypt.adapter";
import { prisma } from "../../../data/postgres";
import { CreateUserDto, CustomError, PaginatedUsersResponse, PaginationDto, UserDatasource, UserEntity } from "../../../domain";


export class PostgresUserDatasourceImpl implements UserDatasource {


    async getAll(pagination: PaginationDto): Promise<PaginatedUsersResponse> {
        
        const { page, limit } = pagination;

        try {
            const skip  = (page - 1) * limit;
             
            const [ total, users ] = await Promise.all([
                prisma.user.count(),
                prisma.user.findMany({
                    skip: skip,
                    take: limit,
                }),
            ]);

            const nextPage = 
                (page * limit ) >= total 
                    ? null
                    : `/api/users?page=${page + 1}?limit=${limit}`;
            
            const prevPage =
                (page - 1) > 0
                    ? `api/users?page=${page - 1}?limit=${limit}`
                    : null;

            return {
                page,
                limit,
                total,
                next: nextPage,
                prev: prevPage,
                users: users.map( user => UserEntity.fromObject(user))
            }
            
        } catch (error) {
            console.log( 'GetUsers - ' + error)
            throw CustomError.internalServer();
        }


    };

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        
        try {
            
            const userExist = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email : createUserDto.email },
                        { phoneNumber: createUserDto.phoneNumber},
                    ]
                }
            });
            

            if(userExist) throw CustomError.badRequest('This email or phone number is already in use. Please try a different one')

            const user = await prisma.user.create({
                data: {
                    ...createUserDto,
                    password: BcryptAdapter.hash(createUserDto.password),
                }
            });
    
            return UserEntity.fromObject(user);

        } catch (error) {
            console.log('createUser - ' + error);
            throw CustomError.internalServer();
        }

    };

    async findById(id: number): Promise<UserEntity> {
        
        try {
            
            const user = await prisma.user.findUnique({
                where: { id }
            });

            if(!user) throw CustomError.notFound(`User wiht id ${id} not found`);

            return UserEntity.fromObject(user);

        } catch (error) {
            throw CustomError.internalServer();
        }

    };

    async deleteById(id: number): Promise<UserEntity> {
        
        try {
            
            await this.findById(id);

            const deleted = prisma.user.delete({
                where: { id }
            });

            return UserEntity.fromObject(deleted);

        } catch (error) {
            throw CustomError.internalServer();
        }

    }

}