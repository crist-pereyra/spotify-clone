import mongoose from 'mongoose';
import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';
import { config } from 'dotenv';

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Album.deleteMany({});
    await Song.deleteMany({});

    // Create all classical songs
    const createdSongs = await Song.insertMany([
      {
        title: 'Spring Allegro',
        artist: 'Antonio Vivaldi',
        imageUrl: '/cover-images/1.jpg',
        audioUrl: '/songs/1.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 207,
      },
      {
        title: 'Eine Kleine Nachtmusik',
        artist: 'Wolfgang Amadeus Mozart',
        imageUrl: '/cover-images/2.jpg',
        audioUrl: '/songs/2.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 360,
      },
      {
        title: 'Moonlight Sonata',
        artist: 'Ludwig van Beethoven',
        imageUrl: '/cover-images/3.jpg',
        audioUrl: '/songs/3.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 900,
      },
      {
        title: 'Canon in D',
        artist: 'Johann Pachelbel',
        imageUrl: '/cover-images/4.jpg',
        audioUrl: '/songs/4.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 300,
      },
      {
        title: 'Dance of the Sugar Plum Fairy',
        artist: 'Pyotr Ilyich Tchaikovsky',
        imageUrl: '/cover-images/5.jpg',
        audioUrl: '/songs/5.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 120,
      },
      {
        title: 'Brandenburg Concerto No.3',
        artist: 'Johann Sebastian Bach',
        imageUrl: '/cover-images/6.jpg',
        audioUrl: '/songs/6.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 656,
      },
      {
        title: 'Gymnopédie No.1',
        artist: 'Erik Satie',
        imageUrl: '/cover-images/7.jpg',
        audioUrl: '/songs/7.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 186,
      },
      {
        title: 'Clair de Lune',
        artist: 'Claude Debussy',
        imageUrl: '/cover-images/8.jpg',
        audioUrl: '/songs/8.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 300,
      },
      {
        title: 'The Four Seasons - Winter',
        artist: 'Antonio Vivaldi',
        imageUrl: '/cover-images/9.jpg',
        audioUrl: '/songs/9.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 252,
      },
      {
        title: 'Hungarian Dance No.5',
        artist: 'Johannes Brahms',
        imageUrl: '/cover-images/10.jpg',
        audioUrl: '/songs/10.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 132,
      },
      {
        title: 'Symphony No.40',
        artist: 'Wolfgang Amadeus Mozart',
        imageUrl: '/cover-images/11.jpg',
        audioUrl: '/songs/11.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 480,
      },
      {
        title: 'Für Elise',
        artist: 'Ludwig van Beethoven',
        imageUrl: '/cover-images/12.jpg',
        audioUrl: '/songs/12.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 150,
      },
      {
        title: 'Boléro',
        artist: 'Maurice Ravel',
        imageUrl: '/cover-images/13.jpg',
        audioUrl: '/songs/13.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 930,
      },
      {
        title: 'Adagio for Strings',
        artist: 'Samuel Barber',
        imageUrl: '/cover-images/14.jpg',
        audioUrl: '/songs/14.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 485,
      },
      {
        title: 'Water Music Suite No.2',
        artist: 'George Frideric Handel',
        imageUrl: '/cover-images/15.jpg',
        audioUrl: '/songs/15.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 360,
      },
      {
        title: 'Symphony No.5',
        artist: 'Ludwig van Beethoven',
        imageUrl: '/cover-images/16.jpg',
        audioUrl: '/songs/16.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 450,
      },
      {
        title: 'Symphony No.9 - Ode to Joy',
        artist: 'Ludwig van Beethoven',
        imageUrl: '/cover-images/17.jpg',
        audioUrl: '/songs/17.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 720,
      },
      {
        title: 'The Blue Danube',
        artist: 'Johann Strauss II',
        imageUrl: '/cover-images/18.jpg',
        audioUrl: '/songs/18.mp3',
        plays: Math.floor(Math.random() * 5000),
        duration: 600,
      },
    ]);

    // Create classical music albums
    const albums = [
      {
        title: 'The Best of Beethoven',
        artist: 'Ludwig van Beethoven',
        imageUrl: '/albums/beethoven.jpg',
        releaseYear: 2024,
        songs: createdSongs
          .filter((song) => song.artist === 'Ludwig van Beethoven')
          .map((song) => song._id),
      },
      {
        title: 'Mozart Essentials',
        artist: 'Wolfgang Amadeus Mozart',
        imageUrl: '/albums/mozart.jpg',
        releaseYear: 2024,
        songs: createdSongs
          .filter((song) => song.artist === 'Wolfgang Amadeus Mozart')
          .map((song) => song._id),
      },
      {
        title: 'Baroque Classics',
        artist: 'Various Artists',
        imageUrl: '/albums/baroque.jpg',
        releaseYear: 2024,
        songs: createdSongs
          .filter((song) =>
            [
              'Antonio Vivaldi',
              'Johann Sebastian Bach',
              'George Frideric Handel',
            ].includes(song.artist)
          )
          .map((song) => song._id),
      },
      {
        title: 'Romantic Melodies',
        artist: 'Various Artists',
        imageUrl: '/albums/romantic.jpg',
        releaseYear: 2024,
        songs: createdSongs
          .filter((song) =>
            ['Johannes Brahms', 'Claude Debussy', 'Erik Satie'].includes(
              song.artist
            )
          )
          .map((song) => song._id),
      },
    ];

    // Insert all albums
    const createdAlbums = await Album.insertMany(albums);

    // Update songs with their album references
    for (const album of createdAlbums) {
      await Song.updateMany(
        { _id: { $in: album.songs } },
        { albumId: album._id }
      );
    }

    console.log(
      'Database seeded successfully with classical music albums and songs!'
    );
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
