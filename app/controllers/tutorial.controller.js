const db = require('../models');
const Tutorial = db.tutorials;

// create and save a new tutorial
exports.create = (req, res) =>{
    // validate request
    if(!req.body.title){
        res.status(404).send({message: "Content cannot be empty!"});
        return
    }

    // create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ?  req.body.published : false
    });

    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the tutorial'
            });
        });
};

// find all tutorials

exports.findAll = (req, res) =>{
    const title = req.body.title;
    var condition = title ? {title: {$regex: new RegExp(title), $option: 'i'}} : {};

    Tutorial.find(condition)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// find a single tutorial with id

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Tutorial.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: 'Not found tutorial with id ' + id});
            }
            else res.send(data);
        })
        .catch(err=>{
            res.status(500).send({message: "error while retrieving tutorial with id = " + id })
        });
};

// update a tutorial
exports.update = (req, res) =>{
    if(!req.body){
        return res.status(400).send({message: 'Data to update cannot be empty!'});
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot update tutorial with id= ${id}. Mayabe Tutorial was not found`});
            }
            else res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error updating tutorial with id= " + id
            });
        });
};

// delete a single tutorial
exports.delete = (req, res) =>{
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Tutorial with id= " +id +" was not found"})
            }
            else res.send({message: "Tutorial deleted successfully"});
        })
        .catch(err=>{
            res.status(500).send({message: 'Could not delete tutorial with id= ' + id});
        });
};

// delete all tutorial in the database
exports.deleteAll = (req, res) =>{
    Tutorial.deleteMany({})
        .then(data=>{
            res.send({
                message: `${data.deletedCount} Tutorial were deleted successfully`
            });
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Some error occurred while removing the tutorials'
            });
        });
};

exports.findAllPublished = (req, res) =>{
    Tutorial.find({published: true})
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "some error occurred while retrieving tutorials"})
        })
}