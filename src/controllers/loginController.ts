import { Request, Response } from 'express'

export class LoginController {
  notesModel: any
  constructor ({ notesModel }: { notesModel: any }) {
    this.notesModel = notesModel
  }

  getTokentoUser = async (req: Request, res: Response): Promise<void> => {
<<<<<<< HEAD
    // const token = req.cookies
    const token = req.cookies.token
    console.log(token)
    res.status(200).json({ message: 'ok', token })
=======
    try {
      const { email, JSWT } = req.body
      res.status(200).json({ Email: email, JSWT })
    } catch (e) {
      res.status(400).json({ message: 'error' })
    }
>>>>>>> parent of e669d01 (Add dependencies and routes for authentication)
  }
}
