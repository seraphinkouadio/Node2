const express = require('express');
const moment = require('moment');

const app = express();
const port = 4000;

// Middleware personnalisé pour vérifier l'heure de la demande
const checkWorkingHours = (req, res, next) => {
  const currentTime = moment().utcOffset('+03:00'); // Modifier le décalage horaire en fonction de votre fuseau horaire
  const dayOfWeek = currentTime.day();
  const hourOfDay = currentTime.hour();

  if ((dayOfWeek >= 1 && dayOfWeek <= 5 )&& (hourOfDay >= 9 && hourOfDay < 17)) {
    next(); // L'application est disponible pendant les heures ouvrables, continuer vers la prochaine étape
  } else {
    res.send('L\'application est disponible uniquement pendant les heures ouvrables (lundi au vendredi de 9h à 17h)');
  }
};

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});