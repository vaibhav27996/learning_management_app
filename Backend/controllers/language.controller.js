const Language = require('../models/langauges');

//Fetch langauges
exports.getLanguages = async (req, res) => {
    try {
        var LangaugeList;
        if (req.query.name != undefined) {
            LangaugeList = await Language.find({ lang_name: { $regex: '^' + req.query.name, $options: 'i' } }, { isdeleted: false });
        } else {
            LangaugeList = await Language.find({ isdeleted: false });
        }

        res.status(200).json(LangaugeList)
    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting language list",
            status: "failure",
        });
    }

}


//create langauges
exports.createLanguage = async (req, res) => {

    try {
        await Language.find({ lang_name: req.body.name }).then(async (callback) => {
            if (callback.length == 0) {

                let newLanguage = new Language({
                    lang_name: req.body.name, 
                    createdAt: new Date()
                });

                await newLanguage.save().then((data) => {
                        res.status(200).json({
                            message: "Langauge added successfully",
                            status: "success",
                            data: data

                        })
                    }).catch((error) => {
                        res.status(200).json({
                            message: error.message,
                            status: "failure",
                            data: error
                        })
                    })
            } else {
                res.status(200).json({
                    message: "language already exist",
                    status: "success",
                })
            }

        }).catch(() => { })
    }
    catch (err) {
        console.log("err", err)
    }

}


//update langauges

exports.updateLanguage = async (req, res) => {
    try {
        await Language.find({ lang_name: req.body.name }).then(async (data) => {
            if (data.length == 0) {

                await Language.findByIdAndUpdate({ _id: req.params.id }, { $set:{ lang_name: req.body.name, modifiedAt: new Date()}},{ new: true })
                    .then((data) => {

                        res.status(200).json({
                            message: "Langauge updated successfully",
                            status: "success",
                            data: data
                        })

                    }).catch((error) => {
                        console.log(error)
                    })

            } else {
                res.status(200).json({
                    message: "Langauge already exists.",
                    status: "success",
                })
            }
        })

    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating languages",
            status: "failure",
        });
    }

}


//delete langauges

exports.deleteLanguage = async (req, res) => {
    try {

        const getLanguageById = await Language.findById({ _id: req.params.id });


        if (getLanguageById != null) {
            let langaugeDeleted = await Language.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true},{new:true});

            res.status(200).json({
                message: "Langauge deleted successfully",
                status: "success",
                data: langaugeDeleted
            });
        } else {
            res.status(200).json({
                message: "Record not found",
                status: "failure"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            message: "failure in deleting languages",
            status: "failure",
        });
    }

}


