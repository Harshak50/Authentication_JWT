const Api = require("../Models/api");

const createApi = async (req, res) => {
  // Check if api exists
  const api = new Api({
    apiName: req.body.apiName,
    apiEndPoint: req.body.apiEndPoint,
    email: req.body.email,
    description: req.body.description,
    public: req.body.public,
    email:req.body.email,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
  });
  try {
    const apiExist = await Api.findOne({ apiEndPoint: req.body.apiEndPoint });
    const apiName = await Api.findOne({ apiName: req.body.apiName });
    if (apiExist) {
      res.status(200).json({ message: "Api url already exists" });
      return;
    }
    if (apiName) {
      res.status(200).json({ message: "Api name already exists" });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }

  try {
    await api.save();
    // Saved API
    console.log("Saved Api");
    return res.status(200).json({ message: "New api created", success: true });
  } catch (error) {
    res.status(400).json({ message: error, auth: false });
  }
};

const deleteAPi = async (req, res) => {
  try {
   
    const api = await Api.findOne({ apiName: req.body.apiName });
     if(api){
      console.log("found api");
      console.log("deleting api");
      await Api.deleteOne({ apiName: req.body.apiName});
      res
        .status(200)
        .json({ message: "Successfully deleted api", success: true });
     }else{
       res.status(200).json({message:"Api not found",success:false})
     }
  } catch (error) {
    res.status(400).json(error);
  }
};

const allApis = async (req, res) => {
  try {
    const data = await Api.find();
    let apis = [];
    if (data) {
      data.map((e) => {
        const y = {
          apiName: e.apiName,
          apiEndPoint: e.apiEndPoint,
          description: e.description,
          public: e.public,
          author: e.author,
          imageUrl: e.imageUrl,
          email:e.email
        };
        apis = [...apis, y];
      });
      res.status(200).json(apis);
    }
  } catch (error) {}
};


//Fetch all APIs of the given user
const fetchMyApis = async (req, res) => {
  const data = await Api.find({email:req.body.email});
  if (data) {
    let apis = []
    data.map((e)=>{
      const y = {
      apiName:e.apiName,
      apiEndPoint: e.apiEndPoint,
      description: e.description,
      public: e.public,
      email:e.email,
      author:e.author,
      imageUrl:e.imageUrl
      }
      apis=[...apis,y]

    })
    res.status(200).json(apis);
  } else {
    res.status(201).json({ message: "No records Found" });
  }
};
module.exports.createApi = createApi;
module.exports.deleteAPi = deleteAPi;
module.exports.allApis = allApis;
module.exports.fetchMyApis = fetchMyApis;
