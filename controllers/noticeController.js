const Notice = require("../models/Notice");

const createNotice = async (req, res) => {
    try {
        const { title, description } = req.body;

        const createdBy = req.user._id;

        if(!title || !description) {
            return res.status(400).json({
                success: false,
                message: "title & description are required"
            });
        }

        const notice = await Notice.create({
            title,
            description,
            image: req.file
            ?
            {
                url: req.file.path,
                public_id: req.file.filename,
            }
            : {
                url: "",
                public_id: "",
            },
            createdBy: req.user._id,

        });
        return res.status(201).json({
            success: true,
            message: "notice created successfully",
            data: notice,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "notice create to failed",
            error: error.message,
        })
        
    }
}

const getAllNotice = async (req, res) => {
    try {
        const notice = await Notice.find()
        .populate("createdBy", "name role email profilePicture")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "notice faced successfully",
            total: notice.length,
            data: notice,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "notice faced to failed",
            error: error.message,
        });
        
    };
}

const noticeUpdate = async (req, res) => {
    try {
       const { id } = req.params;
       const { title, description } = req.body;
       
       const notice = await Notice.findById(id);

       if(!notice) {
        return res.status(404).json({
            success: false,
            message: "notice is not found",
        });
       }

       if(title) {
        notice.title = title;
       }

       if(description) {
        notice.description = description;
       }

       if(req.file) {
        notice.image = {
            url: req.file.path,
            public_id: req.file.filename,
          };

       };

       await notice.save();

       return res.status(200).json({
        success: true,
        message: "notice updated successfully",
        data: notice,
       });
    } catch (error) {
       return res.status(500).json({
        success: false,
        message: "falied to update notice",
        error: error.message,
       });  
    }
};





module.exports = { createNotice, getAllNotice, noticeUpdate, };