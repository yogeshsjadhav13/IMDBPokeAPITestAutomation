const { test, expect } = require('@playwright/test');
import Ajv from 'ajv';
import addFormats from 'ajv-formats';


test('TC001_PokeAPI_APITest: Call /berry/{id} and verify expected response for valid and invalid id', async function ({ request }) {

  //Assuming we are validating the response for berry id 64
  var berry = 64;

  //Sending GET request to the API with valid berry id
  var response = await request.get(`https://pokeapi.co/api/v2/berry/${berry}`);

  //Validating response status
  expect(response.status()).toBe(200);

  //Parsing JSON response
  var responseBody = await response.json();

  //Creating berry index based on the berrydetails array
  const berryDetails = require('../../resources/dataFiles/PokeAPI_Berries.json');
  const berryIndex = berry - 1;

  //Validating actual response against the expected response from json data files
  expect(responseBody.id).toBe(berryDetails[berryIndex].responseBody.id);
  expect(responseBody.name).toBe(berryDetails[berryIndex].responseBody.name);
  expect(responseBody.growth_time).toBe(berryDetails[berryIndex].responseBody.growth_time);
  expect(responseBody.max_harvest).toBe(berryDetails[berryIndex].responseBody.max_harvest);
  expect(responseBody.natural_gift_power).toBe(berryDetails[berryIndex].responseBody.natural_gift_power);
  expect(responseBody.size).toBe(berryDetails[berryIndex].responseBody.size);
  expect(responseBody.smoothness).toBe(berryDetails[berryIndex].responseBody.smoothness);
  expect(responseBody.firmness.name).toBe(berryDetails[berryIndex].responseBody.firmness.name);
  expect(responseBody.firmness.url).toBe(berryDetails[berryIndex].responseBody.firmness.url);
  for (let i = 0; i < berryDetails[berryIndex].responseBody.flavors.length; i++) {
    const Flavor = responseBody.flavors.find(f => f.flavor.name === berryDetails[berryIndex].responseBody.flavors[i].flavor.name);
    expect(Flavor).toBeDefined();
    expect(Flavor.potency).toBe(berryDetails[berryIndex].responseBody.flavors[i].potency);
    expect(Flavor.flavor.url).toBe(berryDetails[berryIndex].responseBody.flavors[i].flavor.url);
  }
  expect(responseBody.item.name).toBe(berryDetails[berryIndex].responseBody.item.name);
  expect(responseBody.item.url).toBe(berryDetails[berryIndex].responseBody.item.url);
  expect(responseBody.natural_gift_type.name).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.name);
  expect(responseBody.natural_gift_type.url).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.url);

  //Sending GET request to the API with invalid berry id
  berry = 65;
  response = await request.get(`https://pokeapi.co/api/v2/berry/${berry}`);
  expect(response.status()).toBe(404);

});




test('TC002_PokeAPI_APITest: Call /berry/{name} and verify expected response for valid and invalid name', async function ({ request }) {

  //Assuming we are validating the response for berry name aspear
  var berryName = "aspear";

  //Sending GET request to the API with valid berry name
  var response = await request.get(`https://pokeapi.co/api/v2/berry/${berryName}`);

  //Validate response status
  expect(response.status()).toBe(200);

  //Parse JSON response
  var responseBody = await response.json();

  const berryDetails = require('../../resources/dataFiles/PokeAPI_Berries.json');
  const berry = berryDetails.find(item => item.responseBody.name === berryName);
  const berryIndex = berry.responseBody.id - 1;

  //Validating actual response against the expected response from json data files
  expect(responseBody.id).toBe(berryDetails[berryIndex].responseBody.id);
  expect(responseBody.name).toBe(berryDetails[berryIndex].responseBody.name);
  expect(responseBody.growth_time).toBe(berryDetails[berryIndex].responseBody.growth_time);
  expect(responseBody.max_harvest).toBe(berryDetails[berryIndex].responseBody.max_harvest);
  expect(responseBody.natural_gift_power).toBe(berryDetails[berryIndex].responseBody.natural_gift_power);
  expect(responseBody.size).toBe(berryDetails[berryIndex].responseBody.size);
  expect(responseBody.smoothness).toBe(berryDetails[berryIndex].responseBody.smoothness);
  expect(responseBody.firmness.name).toBe(berryDetails[berryIndex].responseBody.firmness.name);
  expect(responseBody.firmness.url).toBe(berryDetails[berryIndex].responseBody.firmness.url);
  for (let i = 0; i < berryDetails[berryIndex].responseBody.flavors.length; i++) {
    const Flavor = responseBody.flavors.find(f => f.flavor.name === berryDetails[berryIndex].responseBody.flavors[i].flavor.name);
    expect(Flavor).toBeDefined();
    expect(Flavor.potency).toBe(berryDetails[berryIndex].responseBody.flavors[i].potency);
    expect(Flavor.flavor.url).toBe(berryDetails[berryIndex].responseBody.flavors[i].flavor.url);
  }
  expect(responseBody.item.name).toBe(berryDetails[berryIndex].responseBody.item.name);
  expect(responseBody.item.url).toBe(berryDetails[berryIndex].responseBody.item.url);
  expect(responseBody.natural_gift_type.name).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.name);
  expect(responseBody.natural_gift_type.url).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.url);

  //Sending GET request to the API with invalid berry name
  berryName = "aspearee";
  response = await request.get(`https://pokeapi.co/api/v2/berry/${berryName}`);
  expect(response.status()).toBe(404);
});




test('TC003_PokeAPI_APITest: Call /berry-flavor/{name}, find name of maximum spicy potency berry and validate response against /berriy/{name}', async function ({ request }) {

  //Assuming we are validating the response for berry flavor sweet
  var berryName = "sweet";
  const berryFlavorDetails = require('../../resources/dataFiles/PokeAPI_BerryFlavors.json');
  let berry = berryFlavorDetails.find(item => item.responseBody.name === berryName);
  let berryIndex = berry.responseBody.id - 1;

  //Sending GET request to the API with valid berry flavor name
  var response = await request.get(`https://pokeapi.co/api/v2/berry-flavor/${berryName}`);

  //Validate response status
  expect(response.status()).toBe(200);

  //Parse JSON response
  var responseBody = await response.json();

  //Validating actual response against the expected response from json data files
  expect(responseBody.id).toBe(berryFlavorDetails[berryIndex].responseBody.id);
  expect(responseBody.name).toBe(berryFlavorDetails[berryIndex].responseBody.name);
  expect(responseBody.contest_type.name).toBe(berryFlavorDetails[berryIndex].responseBody.contest_type.name);
  expect(responseBody.contest_type.url).toBe(berryFlavorDetails[berryIndex].responseBody.contest_type.url);
  for (let i = 0; i < berryFlavorDetails[berryIndex].responseBody.berries.length; i++) {
    const berries = responseBody.berries.find(f => f.berry.name === berryFlavorDetails[berryIndex].responseBody.berries[i].berry.name);
    expect(berries).toBeDefined();
    expect(berries.potency).toBe(berryFlavorDetails[berryIndex].responseBody.berries[i].potency);
    expect(berries.berry.name).toBe(berryFlavorDetails[berryIndex].responseBody.berries[i].berry.name);
    expect(berries.berry.url).toBe(berryFlavorDetails[berryIndex].responseBody.berries[i].berry.url);
  }
  for (let i = 0; i < berryFlavorDetails[berryIndex].responseBody.names.length; i++) {
    const names = responseBody.names.find(f => f.language.name === berryFlavorDetails[berryIndex].responseBody.names[i].language.name);
    expect(names).toBeDefined();
    expect(names.name).toBe(berryFlavorDetails[berryIndex].responseBody.names[i].name);
    expect(names.language.url).toBe(berryFlavorDetails[berryIndex].responseBody.names[i].language.url);
  }

  //Picking up all the berries with spicy flavor
  response = await request.get(`https://pokeapi.co/api/v2/berry-flavor/spicy`);
  expect(response.status()).toBe(200);
  responseBody = await response.json();

  //Berries with spicy flavor
  const berries = responseBody.berries;

  //Finding the spiciest berry name
  var berryPotency = [];
  for (let i = 0; i < berries.length; i++) {
    berryPotency[i] = berries[i].potency
  }
  berryPotency.sort((a, b) => b - a);
  const berryNameWithHighestPotency = berries.find(f => f.potency === berryPotency[0]);
  var spiciestBerry = berryNameWithHighestPotency.berry.name;

  // Send GET request to the API
  response = await request.get(`https://pokeapi.co/api/v2/berry/${spiciestBerry}`);

  // Validate response status
  expect(response.status()).toBe(200);

  // Parse JSON response
  responseBody = await response.json();

  //Find the index of the spiciest berry in the json file
  const berryDetails = require('../../resources/dataFiles/PokeAPI_Berries.json');
  berry = berryDetails.find(item => item.responseBody.name === spiciestBerry);
  berryIndex = berry.responseBody.id - 1;

  // Assuming responseBody is the actual API response
  expect(responseBody.id).toBe(berryDetails[berryIndex].responseBody.id);
  expect(responseBody.name).toBe(berryDetails[berryIndex].responseBody.name);
  expect(responseBody.growth_time).toBe(berryDetails[berryIndex].responseBody.growth_time);
  expect(responseBody.max_harvest).toBe(berryDetails[berryIndex].responseBody.max_harvest);
  expect(responseBody.natural_gift_power).toBe(berryDetails[berryIndex].responseBody.natural_gift_power);
  expect(responseBody.size).toBe(berryDetails[berryIndex].responseBody.size);
  expect(responseBody.smoothness).toBe(berryDetails[berryIndex].responseBody.smoothness);
  expect(responseBody.firmness.name).toBe(berryDetails[berryIndex].responseBody.firmness.name);
  expect(responseBody.firmness.url).toBe(berryDetails[berryIndex].responseBody.firmness.url);
  for (let i = 0; i < berryDetails[berryIndex].responseBody.flavors.length; i++) {
    const Flavor = responseBody.flavors.find(f => f.flavor.name === berryDetails[berryIndex].responseBody.flavors[i].flavor.name);
    expect(Flavor).toBeDefined();
    expect(Flavor.potency).toBe(berryDetails[berryIndex].responseBody.flavors[i].potency);
    expect(Flavor.flavor.url).toBe(berryDetails[berryIndex].responseBody.flavors[i].flavor.url);
  }
  expect(responseBody.item.name).toBe(berryDetails[berryIndex].responseBody.item.name);
  expect(responseBody.item.url).toBe(berryDetails[berryIndex].responseBody.item.url);
  expect(responseBody.natural_gift_type.name).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.name);
  expect(responseBody.natural_gift_type.url).toBe(berryDetails[berryIndex].responseBody.natural_gift_type.url);

});




test('Validate PokeAPI Berry endpoint with full schema', async ({ request }) => {
  var response;
  response = await request.get(`https://pokeapi.co/api/v2/berry/1`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();

  //Load JSON schema
  const schema = require('../../resources/dataFiles/PokeAPI_Berries_Schema.json');

  //Validate response with JSON Schema
  const ajv = new Ajv();

  //Support for "format": "uri"
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);

  expect(isValid).toBe(true);
  if (!isValid) {
    console.error(validate.errors);
  }
});


