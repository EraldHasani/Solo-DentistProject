const Clinic = require('../models/clinic.model');


module.exports.findAll = (req, res) => {
    Clinic.find().sort({averagerating: -1})
    .then((allclinics) => {
        res.json({clinics: allclinics})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}

module.exports.top3 = (req, res) => {
    Clinic.find().sort({averagerating: -1}).limit(3)
    .then((allclinics) => {
        res.json({clinics: allclinics})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}


module.exports.findOne = (req, res) => {
    Clinic.findOne({_id: req.params.id})
    .then((oneclinic) => {
        res.json({clinic: oneclinic})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}

module.exports.create = (req, res) => {
    Clinic.create(req.body)
    .then((createclinic) => {
        res.json({clinic: createclinic})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })

}


module.exports.create = (req, res) => {
    Clinic.create(req.body)
    Clinic.findOne({clinic: req.body.clinic})
    .then((oneclinic) => {
        console.log("one",oneclinic)
        if(oneclinic == null){
            Clinic.create(req.body)
            .then((createclinic) => {
                res.json({clinic: createclinic})
            })
            .catch((err) => {
                res.json({message: "Something went wrong", error: err})
            })
        } else{
            res.json({message: "Clinic already exists", code:"AlreadyExists"})
        }
    })   
};

// module.exports.createOneSherbim = (req, res) => {
//     Clinic.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//             $push: { sherbimet: req.body },
//         },
//         { new: true, runValidators: true }
//     )
//     .then((updateclinic) => {
//         res.json({ clinic: updateclinic });
//     })
//     .catch((err) => {
//         res.json({ message: "Something went wrong", error: err });
//     });
// }

module.exports.update = (req, res) => {
    Clinic.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
    .then((updateclinic) => {
        res.json({clinic: updateclinic})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })

}


module.exports.delete = (req, res) => {
    Clinic.deleteOne({_id: req.params.id})
    .then((result) => {
        res.json({result: result})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}


module.exports.createReview = (req, res) => {
    Clinic.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: { review: req.body },
            $inc: { totalreview: 1, totalrating:req.body.rating}
        },
        { new: true, runValidators: true }
    )
    .then((updateclinic) => {
        // Calculate average rating and update the document
        const averageRating = (updateclinic.totalrating / updateclinic.totalreview).toFixed(2);
        return Clinic.findByIdAndUpdate(
            req.params.id,
            { $set: { averagerating: averageRating } },
            { new: true, runValidators: true }
        );
    })
    .then((updatedClinic) => {
        res.json({ clinic: updatedClinic });
    })
    .catch((err) => {
        res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.findAllbyCity = (req, res) => {
    Clinic.find({city: req.params.city})
    .then((allclinics) => {
        res.json({clinics: allclinics})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}


// module.exports.create = async (req, res) => {
//     const coordinates = await getLatLongFromAddress(req.body.address);
//     const clinic = {
//         title: req.body.title,
//         address: req.body.address,
//         description: req.body.description,
//         lat: coordinates.lat,
//         long: coordinates.long,
//         city: req.body.city,
//         phone: req.body.phone,
//         email: req.body.email,
//         image: req.body.image,
//         clinicImages: req.body.clinicImages,
//         clinicImages1: req.body.clinicImages1,
//         clinicImages2: req.body.clinicImages2,
//         cash: req.body.cash,
//         card: req.body.card,
//         bankTransfer: req.body.bankTransfer,
//         sherbime: req.body.sherbime,
//         reviews: req.body.reviews,
//         totalreview: req.body.totalreview,
//         totalrating: req.body.totalrating,
//         averagerating: req.body.averagerating,
//         staff: req.body.staff,
//         userId: req.body.userId
//     }
//     console.log(coordinates);
//     Clinic.create(clinic)
//         .then(newlyCreatedClinic => {
//             res.json({
//                 clinic: newlyCreatedClinic
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//             res.json({
//                 message: 'Something went wrong',
//                 error: err
//             })
//         });
// }
