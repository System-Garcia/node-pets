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
  UpdateUserPermissionsDto,
  UserDatasource,
  UserEntity,
  UserSearchCriteria,
} from "../../../domain";


export class PostgresUserDatasourceImpl implements UserDatasource {
  

  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly webServiceUrl: string,
    ) {}

  async getAll(pagination: PaginationDto): Promise<PaginatedUsersResponse> {
    const { page, limit } = pagination;

    try {
      const skip = (page - 1) * limit;

      const [total, users] = await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
          where: { isDeleted: false },
          skip: skip,
          take: limit,
          include: {
            permissions: {
              select: {
                id: true,
                name: true,
              }
            },
          }
        }),
      ]);
     
      const nextPage =
        (page * limit) >= total
          ? null
          : `${this.webServiceUrl}/users?page=${page + 1}&limit=${limit}`;

      const prevPage =
        (page - 1) > 0 ? `${this.webServiceUrl}/users?page=${page - 1}&limit=${limit}` : null;

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
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
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
        where: { id, isDeleted: false },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
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

      const userDeleted = await prisma.user.update({
        data: { isDeleted: true },
        where: { id },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });
     
      return UserEntity.fromObject(userDeleted);
    } catch (error) {
  
      throw error;
    }
  }

  async findByEmailAndPassword(loginUserDto: LoginUserDto): Promise<UserEntity> {
    
    try {
      const { email, password } = loginUserDto;

      const user = await prisma.user.findUnique( {
        where: { email, isDeleted: false },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
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
 * @returns A promise that resolves to the updated UserEntity.
 * @throws Throws an error if the update operation fails.
 */
  async updateUserById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    
      try {
        // Ensure the user exists
        const existingUser  = await this.findById(updateUserDto.id);
        let userData = updateUserDto.values;
        
        // Check if there's an attempt to update the email
        if (userData.email && userData.email !== existingUser.email ) {
          // Look for any other user already using the new email
          const existEmail = await prisma.user.findUnique({
            where: { email: userData.email }
          });

          // If another user with that email exists and it's not the current user, throw an error
          // This prevents violations of the uniqueness constraint on the 'email' field
          if ( existEmail ) throw CustomError.badRequest('Email already exists')
        };

        if (userData.phoneNumber && userData.phoneNumber !== existingUser.phoneNumber) {
          const existPhoneNumber = await prisma.user.findUnique({
            where: { phoneNumber: userData.phoneNumber }
          });

          if ( existPhoneNumber ) throw CustomError.badRequest('PhoneNumber already exists')
        }

        // Perform the user update operation
        const user = await prisma.user.update( {
          where: { id: updateUserDto.id },
          data: userData,
          include: {
            permissions: {
              select: {
                id: true,
                name: true,
              }
            },
          }
        });



        // Convert and return the updated user
        return UserEntity.fromObject(user);

      } catch (error) {
        // Propagate any caught errors
        throw error;
      }
  }

  async updatePermissionsById(updateUserPermissionsDto: UpdateUserPermissionsDto): Promise<UserEntity> {
    
    try {
      // Ensure the user exists
      await this.findById(updateUserPermissionsDto.id);

      // Verify each permission exists
      const permissions = await Promise.all(
        updateUserPermissionsDto.permissions.map(async (permissionId) => {
          const permissionExist = await this.permissionRepository.verifyPermissionExist(permissionId);
          if (!permissionExist)
            throw CustomError.badRequest(
              `Permission with id ${permissionId} not found`
            );
          return permissionId;
        })
      );
 
      const { id } = updateUserPermissionsDto;

      const userUpdated = await prisma.user.update({
        where: { id },
        data: {
          permissions: {
            set: permissions.map((permissionId) => ({ id: permissionId })),
          }
        },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return UserEntity.fromObject(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async existsByEmailOrPhoneNumber(criteria: UserSearchCriteria): Promise<boolean> {
    
    try {
      const { email, phoneNumber} = criteria;

      const userExists = await prisma.user.findFirst({
        where: {
          OR: [
            { email, isDeleted: false },
            { phoneNumber, isDeleted: false }
          ]
        }
      });

      return !!userExists;

    } catch (error) {
      throw error
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findUnique({
        where: { email, isDeleted: false },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      if (!user) throw CustomError.notFound(`User with email ${email} not found`);

      return UserEntity.fromObject(user);
    } catch (error) {
      throw error;
    }
  }

  async validateUserEmail(Id: number): Promise<UserEntity> {
    try {
      const user = await this.findById(Id);

      const userUpdated = await prisma.user.update({
        where: { id: user.id },
        data: { emailValidated: true },
        include: {
          permissions: {
            select: {
              id: true,
              name: true,
            }
          },
        }
      });

      return UserEntity.fromObject(userUpdated);
    } catch (error) {
      throw error;
    }
  }
}
