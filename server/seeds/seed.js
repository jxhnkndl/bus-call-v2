const { Concert, User } = require('../models');
const concertSeeds = require('./concertSeeds.json');
const userSeeds = require('./userSeeds.json');
const db = require('../config/connection');

const seedDb = async () => {
  console.log('SEEDING DATABASE 🚀');

  db.once('open', async () => {
    try {
      console.log('CLEANING OUT EXISTING DATA ✅');
      await User.deleteMany();
      await Concert.deleteMany();

      console.log('CREATING CONCERTS ✅');

      const concertIds = [];

      for (let i = 0; i < concertSeeds.length; i++) {
        const concert = await Concert.create(concertSeeds[i]);
        concertIds.push(concert._id);
      }

      console.log('CREATING USERS ✅');
      for (let i = 0; i < userSeeds.length; i++) {
        const user = await User.create(userSeeds[i]);

        // Add concerts to users' concert lists
        user.concerts = concertIds;

        await user.save();
      }
    } catch (error) {
      console.log(error);
    }

    console.log('DATABASE SEEDED 🎉');
    process.exit(0);
  });
};

seedDb();
