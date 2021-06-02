const {Design} = require("../models/designSchema");
const fs = require("fs");

exports.getDesigns = async (req, res) => {
    await Design.find({} , async (err, data) => {
        if (err) {
        return res.json({
            message: "No design found"
        })
        } 
        res.send(data);
    })
};

exports.getDesign = async (req, res) => {
    await Design.findById(req.params.id , async (err, data) => {
      if (err) {
        return res.json({
          message: "No design found"
        })
      } 
      res.send(data);
    })
  };

exports.addDesign = async (req, res) => {

    const design = new Design(req.body);

    design.save((err, data) => {
        if (err) {
          res.status(400).json({
            error: "Saving desgin in DB failed",
          });
        }
        res.json(data)
    });
};

exports.editDesign = async (req, res) => {

    Design.findByIdAndUpdate(req.params.id,(err, data) => {
        if (err) {
          res.status(400).json({
            error: "Editing design in DB failed",
          });
        }
        res.send(data)
      },{new:true});
};

exports.deleteDesign = async (req, res) => {

    Design.findByIdAndRemove(req.params.id,(err, data) => {
        if (err) {
          res.status(400).json({
            error: "Deleting design in DB failed",
          });
        }
        res.send(data)
    });
};
