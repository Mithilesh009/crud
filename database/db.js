import mongoose from "mongoose"

mongoose.set('strictQuery', true)

const Connection= async(username,password)=>{
    const URL = `mongodb://${username}:${password}@ac-ndro8yy-shard-00-00.rldcigv.mongodb.net:27017,ac-ndro8yy-shard-00-01.rldcigv.mongodb.net:27017,ac-ndro8yy-shard-00-02.rldcigv.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-73hn32-shard-0&authSource=admin&retryWrites=true&w=majority`;
try {
    await mongoose.connect(URL , { useUnifiedTopology: true , useNewUrlParser: true  });
    console.log("database connected successfully")
} catch (error) {
    console.log("Error while connecting databases " , error)
}
}


export default Connection ;
