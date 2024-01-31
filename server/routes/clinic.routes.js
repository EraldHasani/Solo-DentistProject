const  ClinicController = require('../controllers/clinic.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/clinics', authenticate,  ClinicController.findAll);
    app.get('/api/clinic/:id',authenticate, ClinicController.findOne);
    app.get('/api/top3', authenticate, ClinicController.top3);    
    app.post('/api/clinic',authenticate, ClinicController.create); 
    
    app.patch('/api/clinic/:id',authenticate, ClinicController.update);
    app.delete('/api/clinic/:id',authenticate, ClinicController.delete);
    app.patch('/api/clinic/review/:id',authenticate, ClinicController.createReview);
    app.get("/api/filtered-Clinics/:city",authenticate, ClinicController.findAllbyCity);





}