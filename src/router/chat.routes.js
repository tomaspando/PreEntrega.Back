import { Router } from "express";
import chatModel from "../dao/models/messages.model"


const chatRouter = Router()

chatRouter.get('/', async (req, res) => {
    const messages = await chatModel.find({});
    res.render('index', { messages });
  });


export default productRouter