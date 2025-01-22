const projects = require("../model/projectModel");


exports.addProjectController = async (req, res) =>{
    console.log('inside add project controller');

    const {title,language,github,website, overview} = req.body
    console.log(title,language,github,website, overview);

    const projectImage = req.file.filename
    console.log(projectImage);


    const userId = req.payload

    try{
        const existingproject = await projects.findOne({github})
        if(existingproject){
            res.status(406).json('project already exist')
        }
        else{
            const newProject = new projects({
                title, language, github, website, overview,projectImage, userId
        })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(error){
        res.status(401).json(`project adding failed due to ${error}`)
    }
    
    
    
    
}

//get all projects

exports.getAllProjectController = async (req, res)=>{
    //path parameter = req.params
    //query parameter = req.query
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        language:{
            $regex: searchkey, $options:"i"
        }
    }
    
    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }catch(error){
        res.status(401).json(error)
    }
}

//get home projects
exports.getHomeProjectController = async (req, res)=>{
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }catch(error){
        res.status(401).json(error)
    }
}



//get user projects

exports.getUserProjectController = async (req, res)=>{
    const userId = req.payload
    try{
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }catch(error){
        res.status(401).json(error)
    }
}


//remove user project
exports.removeUserProjectController = async(req,res)=>{
    const {id} = req.params
    try{
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('project deleted successfully')

    }catch(error){
        res.status(401).json(error)
    }
}


exports.updateUserProjectController = async(req, res)=>{
    const {id} = req.params
    const userId = req.payload

    const {title,language,github,website, overview, projectImage} = req.body
    const uploadImage = req.file? req.file.filename: projectImage

    try{
        const existingproject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadImage,
            userId
        }, {new:true})
        await existingproject.save()
        res.status(200).json(existingproject)
    } catch (error) {
        res.status(401).josn(error)
    }


}