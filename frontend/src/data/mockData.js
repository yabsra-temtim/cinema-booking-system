 

export const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    duration: 166,
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    releaseDate: "2024-03-01",
    rating: 4.8,
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9fk8fes4jWu5f.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/8c4a8kE7P2G2Q3Y5R6t7u8i9o0p.jpg",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    director: "Denis Villeneuve",
    status: "now_showing"
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    description: "Po must train a new warrior when he's chosen to become the Spiritual Leader of the Valley of Peace.",
    duration: 94,
    genre: ["Animation", "Action", "Comedy"],
    language: "English",
    releaseDate: "2024-03-08",
    rating: 4.5,
    posterUrl: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELrTs.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    trailerUrl: "https://www.youtube.com/embed/_inKs4eeHiI",
    cast: ["Jack Black", "Awkwafina", "Viola Davis"],
    director: "Mike Mitchell",
    status: "now_showing"
  },
  {
    id: 3,
    title: "Godzilla x Kong: The New Empire",
    description: "Two ancient titans, Godzilla and Kong, clash in an epic battle while humans discover their connection to Skull Island.",
    duration: 115,
    genre: ["Action", "Sci-Fi"],
    language: "English",
    releaseDate: "2024-03-29",
    rating: 4.6,
    posterUrl: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4f4rT5uN8vqX5yZqX5u8YqX5u8Y.jpg",
    trailerUrl: "https://www.youtube.com/embed/qqrpMRDuPfc",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
    director: "Adam Wingard",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Ghostbusters: Frozen Empire",
    description: "The Spengler family returns to the iconic New York City firehouse where they must team up with the original Ghostbusters.",
    duration: 115,
    genre: ["Comedy", "Fantasy"],
    language: "English",
    releaseDate: "2024-03-22",
    rating: 4.3,
    posterUrl: "https://image.tmdb.org/t/p/w500/e1J2oNzSBdou01lUfogYOUr8o2q.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4f4rT5uN8vqX5yZqX5u8YqX5u8Y.jpg",
    trailerUrl: "https://www.youtube.com/embed/PhjYfOUIM0M",
    cast: ["Paul Rudd", "Carrie Coon", "Finn Wolfhard"],
    director: "Gil Kenan",
    status: "upcoming"
  }
];

export const theaters = [
  {
    id: 1,
    name: "CineBook Mall - NYC",
    location: "New York, NY",
    screens: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    name: "CineBook Downtown - LA",
    location: "Los Angeles, CA",
    screens: [1, 2, 3, 4]
  },
  {
    id: 3,
    name: "CineBook Plaza - Chicago",
    location: "Chicago, IL",
    screens: [1, 2, 3]
  }
];

export const showtimes = [
  {
    id: 1,
    movieId: 1,
    theaterId: 1,
    screen: 1,
    date: "2024-03-20",
    startTime: "10:00 AM",
    endTime: "12:46 PM",
    price: 12.99,
    vipPrice: 18.99
  },
  {
    id: 2,
    movieId: 1,
    theaterId: 1,
    screen: 1,
    date: "2024-03-20",
    startTime: "1:30 PM",
    endTime: "4:16 PM",
    price: 12.99,
    vipPrice: 18.99
  },
  {
    id: 3,
    movieId: 1,
    theaterId: 1,
    screen: 2,
    date: "2024-03-20",
    startTime: "7:00 PM",
    endTime: "9:46 PM",
    price: 14.99,
    vipPrice: 20.99
  },
  {
    id: 4,
    movieId: 2,
    theaterId: 2,
    screen: 1,
    date: "2024-03-20",
    startTime: "11:00 AM",
    endTime: "12:34 PM",
    price: 10.99,
    vipPrice: 16.99
  },
  {
    id: 5,
    movieId: 2,
    theaterId: 2,
    screen: 1,
    date: "2024-03-20",
    startTime: "4:00 PM",
    endTime: "5:34 PM",
    price: 10.99,
    vipPrice: 16.99
  }
];

export const seatLayout = {
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  seatsPerRow: 10,
  vipRows: ['E', 'F'],
  blockedSeats: ['A1', 'A2', 'C5', 'D8', 'G3']
};
