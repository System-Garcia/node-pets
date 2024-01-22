export interface IPermission {
    id: number;
    name: string;
  }


export class PermissionEntity {

    constructor( private readonly permission: IPermission) {}

    static fromObject(object: { [key: string]: any }): PermissionEntity {

        const { id, name } = object;
        
        if(!id || isNaN(id)) throw 'id is required and must be a valid number';
        if(!name) throw 'name is required';

        return new PermissionEntity({ id, name });

    }

}