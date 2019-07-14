'use strict';

const menu = require('../controller/menu')


module.exports = router => {

    //input buku
    router.post('/inputmenu', (req, res) => {

        const kodemenu      = req.body.kodemenu;
        const namamenu      = req.body.namamenu;
        const tipemenu      = req.body.tipemenu;
        const harga         = req.body.harga;
        const foto          = req.body.foto;

        if (!kodemenu || !namamenu || !tipemenu || !harga || !foto || !kodemenu.trim() || !namamenu.trim()
            || !tipemenu.trim() || !harga.trim() || !foto.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            menu.inputMenu(kodemenu, namamenu, tipemenu, harga, foto)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({success : true,message: result.message})
                })

                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //get buku
    router.get('/datamenu', (req, res) => {

        menu.dataMenu()
            .then(result => {
                console.log(result)
                res.status(result.status).json({success : true,message: result.message})
            })

            .catch(err => res.status(err.status).json({success : false,message: err.message}));
    });


    //input buku
    router.post('/updatebuku', (req, res) => {

        const kodebuku      = req.body.kodebuku;
        const judul         = req.body.judulbuku;
        const sinopsis      = req.body.sinopsis;
        const pengarang     = req.body.pengarang;
        const harga         = req.body.harga;

        if (!kodebuku || !judul || !sinopsis || !pengarang|| !harga || !kodebuku.trim() || !judul.trim()
            || !sinopsis.trim() || !pengarang.trim() || !harga.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.updateBuku(kodebuku, judul, sinopsis, pengarang, harga)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({success : true,message: result.message})
                })
                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //input buku
    router.post('/hapusbuku', (req, res) => {

        const kodebuku      = req.body.kodebuku;

        if (!kodebuku || !kodebuku.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.hapusBuku(kodebuku)

                .then(result => {
                    res.status(result.status).json({success : true,message: result.message})
                })
                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.post('/getDataBuku', (req, res) => {

        if (!req.body.kodebuku || !req.body.kodebuku.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.dataBukuId(req.body.kodebuku)

                .then(result => {
                    res.status(result.status).json({success : true,message: result.message})
                })

                .catch(err => res.status(err.status).json({success : true,message: err.message}));
        }
    });
};
