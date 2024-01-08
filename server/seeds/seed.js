const { Artist, Concert } = require('../models');
const artistSeeds = require('./artistSeeds.json');
const concertSeeds = require('./concertData.json');
const db = require('../config/connection');

const seedDb = async () => {
  console.log('SEEDING DATABASE 🚀');

  db.once('open', async () => {
    try {
      console.log('CLEANING OUT EXISTING DATA ✅');
      await Artist.deleteMany();
      await Concert.deleteMany();

      // Insert artists individually to ensure passwords get hashed
      console.log('CREATING ARTISTS 👀')
      await Artist.create(artistSeeds[0]);
      await Artist.create(artistSeeds[1]);
      await Artist.create(artistSeeds[2]);

      // Insert concerts individually and attach to queried artist
      console.log('CREATING CONCERTS 👀')
      for (let i = 0; i < concertSeeds.length; i++) {
        console.log(`CREATING CONCERT ${i}`);
        const concertData = await Concert.create(concertSeeds[i]);

        // Capture single artist to attach concert data to
        await Artist.findOneAndUpdate(
          { email: 'tbl@tbl.com' },
          { $addToSet: { concerts: concertData._id }},
          { new: true }
        );
      }
    } catch (error) {
      console.log(error);
    }

    console.log('DATABASE SEEDED 🎉');
    process.exit(0);
  });
};

seedDb();
