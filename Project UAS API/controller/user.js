'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');


//Registrasi
exports.registerUser = (username, lastname, firstname, email, password) =>
    new Promise((resolve,reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({

            username        : username,
            email           : email,
            lastname        : lastname,
            firstname       : firstname,
            password        : hash,
            admin           : false
        });

        newUser.save()

            .then(() => resolve({ status: 200, message: 'Berhasil registrasi' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'User atau email sudah terpakai' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

//login
exports.loginUser = (email, password) =>

    new Promise((resolve,reject) => {

        user.find({email: email})

            .then(users => {

                if (users.length == 0) {

                    reject({status: 200, message: 'Periksa email anda' });

                } else {

                    return users[0];

                }
            })

            .then(user => {

                const hashed_password = user.password;

                if (bcrypt.compareSync(password, hashed_password)) {

                    resolve({ status: 200, message: [ {email: user.email, username: user.username, lastname: user.lastname, firstname: user.firstname}] });

                } else {

                    reject({status: 200, message: 'Periksa kembali password anda' });
                }
            })

            .catch(err => reject({status: 200, message: 'Internal Server Error !' }));

    });
