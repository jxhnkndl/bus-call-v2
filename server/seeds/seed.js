const { Tour, Concert, User } = require('../models');
const concertSeeds = require('./concertSeeds.json');
const tourSeeds = require('./tourSeeds.json')
const userSeeds = require('./userSeeds.json');
const db = require('../config/connection');

const seedDb = async () => {
  console.log('SEEDING DATABASE 🚀');

  db.once('open', async () => {
    try {
      console.log('CLEANING OUT EXISTING DATA ✅');
      await Tour.deleteMany();
      await User.deleteMany();
      await Concert.deleteMany();

      console.log('CREATING TOUR ✅');
      const tour = await Tour.create(tourSeeds[0]);

      console.log('CREATING USERS ✅');
      for (let i = 0; i < userSeeds.length; i++) {
        const user = await User.create(userSeeds[i]);

        // Add user to tour's crew list
        tour.crew.push(user._id);

        await tour.save();
      }

      console.log('CREATING CONCERTS ✅');
      for (let i = 0; i < concertSeeds.length; i++) {
        const concert = await Concert.create(concertSeeds[i]);

        // Push concert into tour's concerts array
        tour.concerts.push(concert._id)

        await tour.save();
      }

    } catch (error) {
      console.log(error);
    }

    console.log('DATABASE SEEDED 🎉');
    process.exit(0);
  });
};

seedDb();
