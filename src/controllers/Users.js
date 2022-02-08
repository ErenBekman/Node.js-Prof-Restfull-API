// const { insert , list , loginUser, modify, remove } = require('../services/Users')
// const projectService = require('../services/Projects')
const httpStatus = require('http-status');
const {
   passwordToHash,
   generateAccessToken,
   generateRefreshToken,
} = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const path = require('path');
const UserService = require('../services/UserService');
const ProjectService = require('../services/ProjectService');

const index = (req, res) => {
   UserService.list()
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const create = (req, res) => {
   req.body.password = passwordToHash(req.body.password);

   UserService.create(req.body)
      .then((response) => {
         res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const login = (req, res) => {
   req.body.password = passwordToHash(req.body.password);
   UserService.show(req.body)
      .then((user) => {
         if (!user)
            return res
               .status(httpStatus.NOT_FOUND)
               .send({ message: 'User not found!' });

         user = {
            ...user.toObject(), //mongodb deki butun kolonlari getirdigi icin
            tokens: {
               access_token: generateAccessToken(user),
               refresh_token: generateRefreshToken(user),
            },
         };
         res.status(httpStatus.OK).send(user);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const projectList = (req, res) => {
   ProjectService.list({ user_id: req.user._id })
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const resetPassword = (req, res) => {
   const new_password =
      uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`;
   UserService.updateWhere(
      { email: req.body.email },
      { password: passwordToHash(new_password) }
   )
      .then((updateUser) => {
         if (!updateUser)
            return res
               .status(httpStatus.NOT_FOUND)
               .send({ error: 'user not found' });
         // res.status(httpStatus.OK).send(updateUser)
         eventEmitter.emit('send_email', {
            to: updateUser.email,
            subject: 'Sifre Sifirlama ✔', // Subject line
            html: `<b>Talebiniz uzere sifre sifirlama isleminiz gerceklesmistir <br/ > Yeni Sifreniz : ${new_password}</b>`, // html body
         });
         res.status(httpStatus.OK).send({
            message: 'sifre sifirlama icin email atilmistir .',
         });
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const update = (req, res) => {
   // UserService.update({_id : req.user._id},req.body)
   UserService.update(req.user._id, req.body)
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};
const changePassword = (req, res) => {
   req.body.password = passwordToHash(req.body.password);
   // UserService.update({_id : req.user._id},req.body)
   UserService.update(req.user._id, req.body)
      .then((response) => {
         res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const deleteUser = (req, res) => {
   if (!req.params.id) {
      res.status(httpStatus.BAD_REQUEST).send({
         message: 'user id not found',
      });
   }
   UserService.delete(req.params.id)
      .then((response) => {
         if (!response) {
            return res
               .status(httpStatus.NOT_FOUND)
               .send({ message: 'user  id not found' });
         }
         res.status(httpStatus.OK).send({
            message: `user - id#${response._id} deleted`,
         });
      })
      .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
};

const updateProfileImage = (req, res) => {
   if (!req.files.profile_image) {
      return res
         .status(httpStatus.BAD_REQUEST)
         .send({ message: 'profile image not found' });
   }
   const extension = path.extname(req.files.profile_image.name);
   const fileName2 = `${req.user.id}${extension}`;
   const fileName = req.files.profile_image.name;
   const folderPath = path.join(__dirname, '../', 'uploads', fileName2);
   req.files.profile_image.mv(folderPath, function (err) {
      if (err)
         return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: err });
      /* 
        UserService.update(req.user._id, {profile_image : fileName}).then(response => {
            res.status(httpStatus.OK).send(response)        
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
        */
      res.status(httpStatus.OK).send({ message: 'profile uploads succesfull' });
   });
};

module.exports = {
   create,
   index,
   login,
   projectList,
   resetPassword,
   update,
   deleteUser,
   changePassword,
   updateProfileImage,
};
