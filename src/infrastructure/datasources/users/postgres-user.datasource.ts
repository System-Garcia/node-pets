import { BcryptAdapter } from "../../../config/bcrypt.adapter";
import { prisma } from "../../../data/postgres";
import {
  CreateUserDto,
  CustomError,
  LoginUserDto,
  PaginatedUsersResponse,
  PaginationDto,
  PermissionRepository,
  UpdateUserDto,
  UserDatasource,
  UserEntity,
} from "../../../domain";


export class PostgresUserDatasourceImpl implements UserDatasource {
  

  constructor(private readonly permissionRepository: PermissionRepository) {}

  async getAll(pagination: PaginationDto): Promise<PaginatedUsersResponse> {
    const { page, limit } = pagination;

    try {
      const skip = (page - 1) * limit;

      const [total, users] = await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
          skip: skip,
          take: limit,
          include: {
            permissions: true,
          }
        }),
      ]);
     
      const nextPage =
        page * limit >= total
          ? null
          : `/api/users?page=${page + 1}&limit=${limit}`;

      const prevPage =
        page - 1 > 0 ? `api/users?page=${page - 1}&limit=${limit}` : null;

      return {
        page,
        limit,
        total,
        next: nextPage,
        prev: prevPage,
        users: users.map((user) => UserEntity.fromObject(user)),
      };
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    try {
      const userExist = await prisma.user.findFirst({
        where: {
          OR: [
            { email: createUserDto.email },
            { phoneNumber: createUserDto.phoneNumber },
          ],
        },
      });

      if (userExist)
        throw CustomError.badRequest(
          "This email or phone number is already in use. Please try a different one"
        );

      const {
        dateOfBirth,
        email,
        firstName,
        img,
        lastName,
        password,
        phoneNumber,
      } = createUserDto;
      
      const user = await prisma.user.create({
        data: {
          dateOfBirth,
          email,
          firstName,
          img,
          lastName,
          phoneNumber,
          password: BcryptAdapter.hash(password),
          permissions: {
            connect: [{ id: 2}]
          }
        },
        include: {
          permissions: true,
        }
      });

      return UserEntity.fromObject(user);
    } catch (error) {

      throw error;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          permissions: true,
        }
      });

      if (!user) throw CustomError.notFound(`User wiht id ${id} not found`);

      return UserEntity.fromObject(user);
    } catch (error) {

      throw error
    }
  }

  async deleteById(id: number): Promise<UserEntity> {
    try {
      await this.findById(id);

      const deleted = prisma.user.delete({
        where: { id },
        include: {
          permissions: true,
        }
      });
     
      return UserEntity.fromObject(deleted);
    } catch (error) {
  
      throw error;
    }
  }

  async findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity> {
    
    try {
      const { email, password } = loginUserDto;

      const user = await prisma.user.findUnique( {
        where: { email },
        include: {
          permissions: true,
        }
      });

      if(!user || !BcryptAdapter.compare(password, user.password)) {
        throw CustomError.badRequest('Invalid credentials');
      };

      return UserEntity.fromObject(user); 

    } catch (error) {
      throw error;
    }
  
  }


  /**
 * Asynchronously updates a user in the database.
 * 
 * @param updateUserDto - Object containing user update information.
 *   Includes the user's ID and new values for user fields.
 *   Can also include an array of permission IDs if permissions need to be updated.
 * @returns A promise that resolves to the updated UserEntity.
 * @throws Throws an error if the update operation fails.
 */
  async updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    
      try {
        // Ensure the user exists
        await this.findById(updateUserDto.id);
        
        let userData = updateUserDto.values;

        // Update permissions if provided
        if( updateUserDto.permissions ) {
          
           // Verify each permission exists
          const permissions = await Promise.all(

            updateUserDto.permissions.map( async (permissionId) => {

              const permissionExist = await this.permissionRepository.verifyPermissionExist(permissionId);
              if( !permissionExist ) throw CustomError.badRequest(`Permission with id ${permissionId} not found`);
              return permissionId

          }));

          // Set the new permissions in userData
          userData.permissions = {
            set: permissions.map( permissionId => ({ id: permissionId }))
          }

        }

         // Perform the user update operation
        const user = await prisma.user.update( {
          where: { id: updateUserDto.id },
          data: userData,
          include: {
            permissions: true,
          }
        });

        // Convert and return the updated user
        return UserEntity.fromObject(user);

      } catch (error) {
        // Propagate any caught errors
        throw error;
      }
  }
}
