const { Artist, Concert, User } = require('../models');
const artistSeeds = require('./artistSeeds.json');
const concertSeeds = require('./concertSeeds.json');
const userSeeds = require('./userSeeds.json');
const db = require('../config/connection');

const seedDb = async () => {
  console.log('SEEDING DATABASE 🚀');

  db.once('open', async () => {
    try {
      console.log('CLEANING OUT EXISTING DATA ✅');

      // Clear out existing data
      await User.deleteMany();
      await Artist.deleteMany();
      await Concert.deleteMany();

      // Seed artist
      console.log('CREATING ARTIST 👀');

      // Create new artist and make first user in database the artist admin
      const artist = await Artist.create({ ...artistSeeds[0] });

      // Seed Users
      console.log('CREATING USERS 👀');

      for (let i = 0; i < userSeeds.length; i++) {
        console.log(`CREATING USER #${i} ✅`);

        // Make first user in user seeds the artist admin
        // Add artist to every user's artist access array
        const user = await User.create({
          ...userSeeds[i],
          artists: [artist._id],
          admin: i === 0 ? [artist._id] : []
        });

        // Add each user to the artist's crew array
        artist.crew.push(user._id);

        await artist.save();
      }

      // Seed concerts
      console.log('CREATING CONCERTS 👀');

      for (let i = 0; i < concertSeeds.length; i++) {
        console.log(`CREATING CONCERT #${i} ✅`);

        // Create concert
        const concert = await Concert.create(concertSeeds[i]);

        artist.concerts.push(concert._id);

        await artist.save();
      }
    } catch (error) {
      console.log(error);
    }

    console.log('DATABASE SEEDED 🎉');
    process.exit(0);
  });
};

seedDb();
