

export class UpdatePermissionDto {

  private constructor(
    public readonly id: number,
    private readonly name?: string
  ) {}


  get values() {

    const returnObj: {[key: string]:any} = {};

    if(this.name) returnObj.name = this.name

    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdatePermissionDto?] {

    const { id, name} = object;


    if (!id || isNaN(id)) return ['id must be a valid number'];

    return [undefined, new UpdatePermissionDto(id, name)]

  }

}
