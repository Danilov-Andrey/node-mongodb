const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Doesnt contains name or price'
    });
  }

  next();
};

exports.checkId = (req, res, next, val) => {
  const tour = tours.find(tour => +val === tour.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    });
  }

  next();
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(tour => id === tour.id);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tour }
  });
};
exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
};
exports.postTour = (req, res) => {
  res.send('Ooops');
};
exports.patchTour = (req, res) => {};
exports.deleteTour = (req, res) => {};
