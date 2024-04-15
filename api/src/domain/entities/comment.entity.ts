export interface ICommentEntity {
    id: number;
    text: string;
    userId: number;
    rewardId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CommentEntity {

    public id: number;
    public text: string;
    public userId: number;
    public rewardId: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(commentData: ICommentEntity) {
        const { id, text, userId, rewardId, createdAt, updatedAt } = commentData;

        this.id = id;
        this.text = text;
        this.userId = userId;
        this.rewardId = rewardId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };

    static fromObject(object: {[key: string]:any}): CommentEntity {
        const { id, _id, text, userId, rewardId, createdAt, updatedAt } = object;

        if (!id && !_id) throw new Error('Missing comment id');
        if (!text) throw new Error('Missing text');
        if (!userId) throw new Error('Missing userId');
        if (!rewardId) throw new Error('Missing rewardId');
        if (!createdAt) throw new Error('Missing createdAt');
        if (!updatedAt) throw new Error('Missing updatedAt');

        return new CommentEntity({
            id: id || _id,
            text,
            userId,
            rewardId,
            createdAt,
            updatedAt,
        });
    }
}
