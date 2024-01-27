const ClinicController = require('../controllers/clinic.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/clinics',   ClinicController.findAll);
    app.get('/api/clinic/:id', ClinicController.findOne);
    app.get('/api/top3', authenticate, ClinicController.top3);    
    app.post('/api/clinic', ClinicController.create); 
    
    app.put('/api/clinic/:id', ClinicController.update);
    app.delete('/api/clinic/:id', ClinicController.delete);
    app.patch('/api/clinic/review/:id',authenticate, ClinicController.createReview);
    app.get("/api/filtered-Clinics/:city",authenticate, ClinicController.findAllbyCity);


}