const { Router } = require("express");
const axios = require("axios");
const { Country, Activity } = require("../db");

const router = Router();

///////////////////////////// Obtengo info de la api y lleno la db /////////////////////////////

const getCountry = async () => {
  const countryApi = await axios.get("https://restcountries.com/v3.1/all");
  const countryInfo = await countryApi.data.map((el) => {
    return {
      cca3: el.cca3,
      name: el.name.common,
      flags: el.flags.png,
      region: el.region,
      capital: el.capital ? el.capital[0] : "sin capital",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
  });
  await Country.bulkCreate(countryInfo);
  // console.log("Se llenó la BBD con países");
};


///////////////////////////// get Countries and get countries?name= /////////////////////////////

router.get("/", async (req, res) => {
  const { name } = req.query; // busca si hay un name por url "/countries?name={name}"
  const check = await Country.count();
  console.log(check);
  if (check === 0) {
    await getCountry();
  }
  const allCountries = await Country.findAll({ include: Activity });
  if (name) {
    const countryName = allCountries.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    if (countryName.length) {
      let nombre = countryName.map((e) => e.name);
      let countryAndActivity = await Country.findAll({
        where: { name: nombre },
        include: Activity,
      });
      res.send(countryAndActivity);
    } else {
      res.send("pais no existente");
    }
  } else {
    res.send(allCountries);
  }
});


///////////////////////////// get Countries/idCountry /////////////////////////////

router.get('/:idCountry', async (req, res) => {
  const {idCountry} = req.params;
  try{
  let countryDetail = await Country.findOne({where: {cca3:idCountry}, include: Activity});
  if(countryDetail){
      res.send(countryDetail);
  } 
  else  res.send('id incorrecto');
  }
  catch(error){
      console.log(error)
  }
  
});



module.exports = router;
