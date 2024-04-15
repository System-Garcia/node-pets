import { Request, Response } from "express";


export class CommentController {

    constructor() {}

    public getAllComments(req: Request, res: Response) {
        res.json({ message: "Get all comments" });
    }

    public createComment(req: Request, res: Response) {
        res.json({ message: "Create comment" });
    }

    public updateComment(req: Request, res: Response) {
        res.json({ message: "Update comment" });
    }

    public deleteComment(req: Request, res: Response) {
        res.json({ message: "Delete comment" });
    }

}

