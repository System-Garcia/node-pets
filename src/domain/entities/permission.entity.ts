export interface IPermission {
    id: number;
    name: string;
  }


export class PermissionEntity {

    public readonly id: number;
    public readonly name: string;

    constructor( permission: IPermission) {
        this.id = permission.id;
        this.name = permission.name;
    }

    static fromObject(object: { [key: string]: any }): PermissionEntity {

        const { id, name } = object;
        
        if(!id || isNaN(id)) throw 'id is required and must be a valid number';
        if(!name) throw 'name is required';

        return new PermissionEntity({ id, name });

    }

}