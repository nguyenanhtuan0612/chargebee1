import { Request, Response } from 'express';

class IndexController {
    public index = (req: Request, res: Response): void => {
        try {
            res.send('This is the truth of the universe');
        } catch (error) {
            throw error;
        }
    };
}

export default IndexController;
