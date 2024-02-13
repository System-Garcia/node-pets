
export class CreatePermissionDto {

  private constructor(
    public readonly name: string
  ) {}



  static create(object: {[key: string]:any }): [string?, CreatePermissionDto?] {

    const { name } = object;

    if(!name) return ['Missing name'];

    return [undefined, new CreatePermissionDto(name)];

  }

}
