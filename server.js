import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

// Use your actual RapidAPI key
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(cors());

// Helper to get skyId and entityId from city name
async function getLocationDetails(city) {
  const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(city)}&locale=en&types%5B%5D=city&types%5B%5D=airport`;
  const response = await fetch(url);
  const data = await response.json();

  const bestMatch = data.find(
    item => item.type === 'city' || item.type === 'airport'
  );

  if (!bestMatch) {
    throw new Error(`City not found: ${city}`);
  }
  console.log( bestMatch.code)
  return {
    skyId: bestMatch.code,        // e.g. "PAR" for Paris
    entityId: bestMatch.code      // Re-use the same code for later search
  };
}

app.get('/api/search-flights', async (req, res) => {
  try {
    const { originSkyId, destinationSkyId, date, returnDate,cabinClass, adults,sortBy,currency,market,countryCode } = req.query;
if (!originSkyId || !destinationSkyId || !date) {
  return res.status(400).json({ error: 'Missing required parameters: originSkyId, destinationSkyId, or date',originSkyId:originSkyId,destinationSkyId:destinationSkyId,date:date,query:req.query });
}
    // Step 1: Get Sky IDs
    const [originInfo, destInfo] = await Promise.all([
      getLocationDetails(originSkyId),
      getLocationDetails(destinationSkyId)
    ]);

    // Step 2: Search flights using Sky IDs
    const searchParams = new URLSearchParams({
      originSkyId: originInfo.skyId,
      destinationSkyId: destInfo.skyId,
      originEntityId: originInfo.entityId,
      destinationEntityId: destInfo.entityId,
      date,
      returnDate,
      cabinClass: cabinClass,
      adults,
      sortBy: sortBy,
      currency: currency,
      market: market,
      countryCode: countryCode
    });

    const searchUrl = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${searchParams}`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY
      }
    });

    const flights = await response.json();
    res.json(flights);

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
