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

      console.log('CREATING USERS 👀');

      // Save user and artist ids to associate with other documents
      const userIds = [];
      const artistIds = [];

      // Seed users
      for (let i = 0; i < userSeeds.length; i++) {
        console.log(`CREATING USER #${i} ✅`);

        const user = await User.create(userSeeds[i]);

        // Save the user id to associate with an artist
        userIds.push(user._id);
      }

      console.log('CREATING ARTISTS 👀');

      // Seed artists
      for (let i = 0; i < artistSeeds.length; i++) {
        console.log(`CREATING ARTIST #${i} ✅`);

        // Create new artist and make first user in database the artist admin
        const artist = await Artist.create({
          ...artistSeeds[i],
          admin: userIds[0],
          crew: [userIds[0]]
        });

        // Update the admin user's profile to include the artist id
        await User.findOneAndUpdate(
          { _id: userIds[0] },
          { $addToSet: { artists: artist._id } },
          { new: true }
        );

        // Save the artist id to associate with concerts
        artistIds.push(artist._id);
      }

      console.log('CREATING CONCERTS 👀');

      for (let i = 0; i < concertSeeds.length; i++) {
        console.log(`CREATING CONCERT #${i} ✅`);

        // Create concert
        const concert = await Concert.create(concertSeeds[i]);

        // Associate concert with artist
        await Artist.findOneAndUpdate(
          { _id: artistIds[0] },
          { $addToSet: { concerts: concert._id } },
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
