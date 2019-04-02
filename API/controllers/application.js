const { validationResult } = require('express-validator/check');
const Application = require('../models/Application');
const User = require('../models/User');

function validateApplication(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });

    return false;
  }

  return true;
}

async function isAdmin (req) {
  let user = await User.findById(req.userId);
  return user.role === 'Admin';
}

module.exports = {
  getApplications: async (req, res, next) => {
    let approved = await isAdmin(req);
    if (approved) {
      Application.find({})
      .then((applications) => {
        res
          .status(200)
          .json({ message: 'Fetched applications successfully.', applications });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    } else {
      res
        .status(403)
        .json({
          message: 'Not authorised'
        });
      next(new Error('Not authorised'));
    }
  },
  getApplicationsByUserId: (req, res, next) => {
    let userId = req.params.id;
    Application.find({ userId })
      .then((applications) => {
        res
          .status(200)
          .json({ message: 'Fetched applications successfully.', applications });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  apply: async (req, res, next) => {
    let approved = await isAdmin(req);   
    if (validateApplication(req, res) && !approved) {
        const { title, body } = req.body;
        const { userId } = req;

        // Create the post in DB and return 201 status code with a message and the post itself with the creator
        const application = new Application({ title, body, userId });
  
        application.save()
          .then(() => {
            res
              .status(201)
              .json({
                message: 'Application created successfully!'
              })
          })
          .catch((error) => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            console.error(error);
    
            next(error);
          });
      } else {
        res
          .status(403)
          .json({
            message: 'Not authorised'
          })
        next(new Error('Not authorised'));
      }
  },
  approve: async (req, res, next) => {
    const applicationId = req.params.id;
    const approval = req.params.approval;
    const approved = await isAdmin(req);

    if (approved) {
      Application.findById(applicationId)
      .then(application => {
        if (!application) {
          const error = new Error('Application not found!');
          error.statusCode = 404;
          throw error;
        }
        const approvalValue = Number(approval); 

        application.state = approvalValue;
        if (approvalValue === 1) {
          await User.findByIdAndUpdate(req.userId, { role: 'Admin' });
        }
        await application.save();
        res
          .status(200)
          .json({
            message: `Application managed. The user has been ${approvalValue === 0 ? 'dis' : ''}approved.`
          });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    } else {
      res
        .status(403)
        .json({
          message: 'Not authorised'
        });
      next(new Error('Not authorised'));
    }
    
  },
}