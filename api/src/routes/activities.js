const { Router } = require("express");
const axios = require("axios");
const { Country, Activity } = require("../db");

const router = Router();


///////////////////////////// Uso el método create para hacer una instancia del modelo Activity  /////////////////////////////

const createActivity = async (name,difficulty, duration,season,idCountry) => {
  const newActivity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
  });
  await newActivity.addCountry(idCountry);
  return newActivity;
}


///////////////////////////// post Activity /////////////////////////////

router.post('/', async (req, res) => {
  const {name, difficulty, duration, season,idCountry} = req.body;
  try{
      if(!name){
          res.send('name required for the activity') 
      }
      else{
          const nuevaActividad = await createActivity(name, difficulty, duration, season,idCountry);
          res.send(nuevaActividad)
      }
  }
  catch(error){
      console.log(error)
  }  
})


///////////////////////////// get Activity /////////////////////////////


router.get('/', async (req, res) => {
  const allActivities = await Activity.findAll();
  allActivities.length ? res.send(allActivities)
  : res.send('No activities')
  
})


module.exports = router;