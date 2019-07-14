'use strict'

const pesanan = require('../model/pesanan')

exports.inputPesanan = (kodepemesanan, kodemenu, namamenu, qty, total) =>
    new Promise((resolve,reject) => {


        const dataMenu = new menu({

            kodepemesanan : kodepemesanan,
            kodemenu      : kodemenu,
            namamenu    : namamenu,
            qty    : qty,
            total       : total,
            created_at  : new Date()
        });

        dataMenu.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data buku' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'Kode buku sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

exports.dataMenu = ()=>
    new Promise((resolve, reject)=>{
        menu.find()
            .then(menus => {
                if (menus.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: menus});
                }
            })

    });

exports.updateMenu = (kodemenu, namamenu, tipemenu, harga) =>
    new Promise((resolve,reject) => {

        const kodeBuku = ({
            kodebuku : kodebuku
        });

        const dataBuku = ({
            kodemenu    : kodemenu,
            namamenu    : namamenu,
            tipemenu    : tipemenu,
            harga       : harga,
            created_at  : new Date()
        });


        buku.update(kodeBuku, dataBuku)

            .then(() => resolve({

                status: 200, message: 'Berhasil update data buku'

            }))

            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.hapusBuku = (kodebuku) =>
    new Promise((resolve,reject) => {

        const kodeBuku = ({
            kodebuku : kodebuku
        });

        buku.remove(kodeBuku)

            .then(() => resolve({ status: 200, message: 'Data berhasil dihapus' }))

            .catch(err => {

                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.dataBukuId = (kodebuku) =>
    new Promise((resolve,reject) => {

        const ids = ({
            kodebuku:kodebuku
        });

        buku.findOne(ids)
            .then(ressults => {
                if (ressults.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: ressults});
                }
            }).catch(err =>{
            reject({ status: 200, message: 'Data tidak ditemukan' });
        })
    });
