const express = require("express");
var ObjectID = require("mongoose").Types.ObjectId;
var router = express.Router();

var {
  Aquaria
} = require("../models/aquaria");

const pagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return {
    limit,
    offset
  };
};

router.get("/", (req, res) => {
  const {
    page,
    size,
    search,
    sort
  } = req.query;

  const {
    limit,
    offset,
  } = pagination(page, size);

  let sorter = {
    name: 1
  };

  if (sort) {
    const arr = sort.split(/ (.*)/);
    sorter = {
      [arr[0]]: arr[1] === "desc" ? -1 : 1
    };
  }

  const options = {
    limit,
    offset,
    sort: sorter
  };

  let regex = new RegExp(search, "i");
  var regexQuery = {
    $and: [{
      $or: [{
          name: regex
        },
        {
          scientificName: regex
        },
        {
          minimumTankSize: regex
        },
        {
          temperament: regex
        },
        {
          details: regex
        },
      ],
    }],
  };

  Aquaria.paginate(
      regexQuery, options
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(
        "Error while retrieving list : " + JSON.stringify(err, undefined, 2)
      );
    });

});

router.post("/", (req, res) => {
  var record = new Aquaria({
    name: req.body.name,
    scientificName: req.body.scientificName,
    minimumTankSize: req.body.minimumTankSize,
    temperament: req.body.temperament,
    details: req.body.details,
  });

  record.save((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  var record = {
    name: req.body.name,
    scientificName: req.body.scientificName,
    minimumTankSize: req.body.minimumTankSize,
    temperament: req.body.temperament,
    details: req.body.details,
  };

  Aquaria.findByIdAndUpdate(
    req.params.id, {
      $set: record,
    }, {
      new: true,
    },
    (err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error while updating a record : " + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  Aquaria.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while deleting a record : " + JSON.stringify(err, undefined, 2)
      );
  });
});

module.exports = router;