const mongoose = require('mongoose');
const Clinic = new mongoose.Schema({
    title: { 
        type: String,
        minLength: [5, 'The title should be more then 5 characters'],
        required: [true, 'The title is required']
    },
    description: {
        type: String,
        minLength: [10, 'The description should be more then 10 characters'],
        required: [true, 'The description is required']
    },
    address:{
        type: String,
        minLength: [5, 'The adress should be more then 5 characters'],
        required: [true, 'The adress is required']
    },
    // lat: {
    //     type: Number
    // },
    // long: {
    //     type: Number
    // },
    city:{
        type: String,
        required: [true, 'The city is required']
    },
    phone:{
        type: String,
        minLength: [10, 'The phone should be more then 10 characters'],
        required: [true, 'The phone is required']
    },
    email:{
        type: String,
        minLength: [5, 'Email should be more then 5 characters'],
        required: [true, 'Email is required']
    },
    image:{
        type: String,
    },
    clinicImages:{
        type : String}, 

     clinicImages1: {
            type: String,
        },
        clinicImages2: {
            type: String,
        },
        
  
    cash:{
        type: Boolean,
        default: false,
    },
    card:{
        type: Boolean,
        default: false,
    },
   bankTransfer:{
    type: Boolean,
    default: false,
   },

    sherbime:[
        {
            servicesTitle: { 
                type: String,
                minLength: [5, 'The title should be more then 10 characters'],
            },
            servicesDescription: {
                type: String,
                minLength: [10, 'The description should be more then 10 characters'],
            },
            servicesDuration:{
                type: Number,
            },
        
            servicesType:{
                type: String,
            },
            servicesPrice:{
                type: Number,
            },
        
        }
    ],

    
     review:[ {
        text:{
            type: String,
            minLength: [5, 'The description should be more then 5 characters'],
            required: [true, 'The description is required']
        },
        rating:{
            type: Number,
            required: [true, 'The rating is required'],
            min: [1, 'The rating should be between 1 and 5'],
            max: [5, 'The rating should be between 1 and 5'],
        },
       
          firstName:{
            type: String,
            required: [true, "First name is required"]
          },
            lastName:{
                type: String,
                required: [true, "Last name is required"]
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
              },

    }   ],


    totalreview:{
        type: Number,
        default: 0,
    },
    totalrating:{
        type: Number,
        default: 0,
    },
    averagerating: {
        type: Number,
        default: 0,
    },


    staff:[{
        firstName:{
            type: String,
            minLength: [3, 'FirstName should be more then 3 characters'],
        },
        lastName:{
            type: String,
            minLength: [3, 'LastName should be more then 3 characters'],
        },
        experience:{
            type: Number,
        },
       expertise:{
            type: String,
            minLength: [5, 'The Expertise should be more then 5 characters'],
        },
        education:{
            type: String,
            minLength: [5, 'Education should be more then 5 characters'],
        },
        imageStaff:{
            type: String,
            
        },
        }],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    

   
   
   
     
    

 




}, { timestamps: true });
module.exports = mongoose.model('Clinic', Clinic);