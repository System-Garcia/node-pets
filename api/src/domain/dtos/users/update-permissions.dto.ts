interface IUpdateUserPermissionsDto {
    id: number;
    permissions: number[];
}

export class UpdateUserPermissionsDto {

    public readonly id;
    public readonly permissions;

    private constructor(userPermissions: IUpdateUserPermissionsDto) {
        this.id = userPermissions.id;
        this.permissions = userPermissions.permissions;
    };

    

    static create(props: {[key: string]: any}): [string?, UpdateUserPermissionsDto?] {

        const { id, permissions } = props;

        if ( !id || isNaN(id) ) return ['Id must be a valid number'];
        if ( !permissions ) return ['Permissions are required'];
        if ( !Array.isArray(permissions)) return ['Permissions must be an array'];

        permissions.forEach( permission => {
            if(isNaN(permission)) {
                return ['Permissions must be an array of numbers'];
            }
        });

        return [undefined, new UpdateUserPermissionsDto({id, permissions})]
    }
}