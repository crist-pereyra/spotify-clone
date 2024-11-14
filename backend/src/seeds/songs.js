import mongoose from 'mongoose';
import { Song } from '../models/song.model.js';
import { config } from 'dotenv';

config();

const songs = [
  {
    title: 'Spring Allegro',
    artist: 'Antonio Vivaldi',
    imageUrl: '/cover-images/1.jpg',
    audioUrl: '/songs/1.mp3',
    duration: 46, // 0:46
  },
  {
    title: 'Eine Kleine Nachtmusik',
    artist: 'Wolfgang Amadeus Mozart',
    imageUrl: '/cover-images/2.jpg',
    audioUrl: '/songs/2.mp3',
    duration: 41, // 0:41
  },
  {
    title: 'Moonlight Sonata',
    artist: 'Ludwig van Beethoven',
    imageUrl: '/cover-images/3.jpg',
    audioUrl: '/songs/3.mp3',
    duration: 24, // 0:24
  },
  {
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    imageUrl: '/cover-images/4.jpg',
    audioUrl: '/songs/4.mp3',
    duration: 24, // 0:24
  },
  {
    title: 'Dance of the Sugar Plum Fairy',
    artist: 'Pyotr Ilyich Tchaikovsky',
    imageUrl: '/cover-images/5.jpg',
    audioUrl: '/songs/5.mp3',
    duration: 36, // 0:36
  },
  {
    title: 'Brandenburg Concerto No.3',
    artist: 'Johann Sebastian Bach',
    imageUrl: '/cover-images/6.jpg',
    audioUrl: '/songs/6.mp3',
    duration: 40, // 0:40
  },
  {
    title: 'Gymnopédie No.1',
    artist: 'Erik Satie',
    imageUrl: '/cover-images/7.jpg',
    audioUrl: '/songs/7.mp3',
    duration: 39, // 0:39
  },
  {
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    imageUrl: '/cover-images/8.jpg',
    audioUrl: '/songs/8.mp3',
    duration: 28, // 0:28
  },
  {
    title: 'The Four Seasons - Winter',
    artist: 'Antonio Vivaldi',
    imageUrl: '/cover-images/9.jpg',
    audioUrl: '/songs/9.mp3',
    duration: 28, // 0:28
  },
  {
    title: 'Hungarian Dance No.5',
    artist: 'Johannes Brahms',
    imageUrl: '/cover-images/10.jpg',
    audioUrl: '/songs/10.mp3',
    duration: 30, // 0:30
  },
  {
    title: 'Symphony No.40',
    artist: 'Wolfgang Amadeus Mozart',
    imageUrl: '/cover-images/11.jpg',
    audioUrl: '/songs/11.mp3',
    duration: 29, // 0:29
  },
  {
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    imageUrl: '/cover-images/12.jpg',
    audioUrl: '/songs/12.mp3',
    duration: 17, // 0:17
  },
  {
    title: 'Boléro',
    artist: 'Maurice Ravel',
    imageUrl: '/cover-images/13.jpg',
    audioUrl: '/songs/13.mp3',
    duration: 39, // 0:39
  },
  {
    title: 'Adagio for Strings',
    artist: 'Samuel Barber',
    imageUrl: '/cover-images/14.jpg',
    audioUrl: '/songs/14.mp3',
    duration: 27, // 0:27
  },
  {
    title: 'Water Music Suite No.2',
    artist: 'George Frideric Handel',
    imageUrl: '/cover-images/15.jpg',
    audioUrl: '/songs/15.mp3',
    duration: 36, // 0:36
  },
  {
    title: 'Symphony No.5',
    artist: 'Ludwig van Beethoven',
    imageUrl: '/cover-images/16.jpg',
    audioUrl: '/songs/16.mp3',
    duration: 39, // 0:39
  },
  {
    title: 'Symphony No.9 - Ode to Joy',
    artist: 'Ludwig van Beethoven',
    imageUrl: '/cover-images/17.jpg',
    audioUrl: '/songs/17.mp3',
    duration: 39, // 0:39
  },
  {
    title: 'The Blue Danube',
    artist: 'Johann Strauss II',
    imageUrl: '/cover-images/18.jpg',
    audioUrl: '/songs/18.mp3',
    duration: 29, // 0:29
  },
];

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing songs
    await Song.deleteMany({});

    // Insert new songs
    await Song.insertMany(songs);

    console.log('Songs seeded successfully!');
  } catch (error) {
    console.error('Error seeding songs:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedSongs();
