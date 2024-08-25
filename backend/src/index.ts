import {Server} from "./server";
import dotenv from 'dotenv';
dotenv.config();
const server = new Server();
const PORT=process.env.PORT || 3000;
server.app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} url: http://localhost:${PORT}`);
})