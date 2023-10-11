const userDB = [
  {
    "name": "Alice Johnson",
    "team": "Alpha",
    "id": "u1a2b3c4d5"
  },
  {
    "name": "Bob Smith",
    "team": "Beta",
    "id": "u5d4c3b2a1"
  },
  {
    "name": "Cathy Brown",
    "team": "Alpha",
    "id": "u9e8f7g6h5"
  },
  {
    "name": "David Green",
    "team": "Gamma",
    "id": "u1i2j3k4l5"
  },
  {
    "name": "Emma White",
    "team": "Beta",
    "id": "u5m6n7o8p9"
  },
  {
    "name": "Alan Clite",
    "team": "Beta",
    "id": "u5m6n7p9"
  },
  {
    "name": "Frank Black",
    "team": "Gamma",
    "id": "u9r8s7t6u5"
  },
  {
    "name": "Grace Martinez",
    "team": "Alpha",
    "id": "u1w2x3y4z5"
  },
  {
    "name": "Grahm Hamle",
    "team": "Alpha",
    "id": "u1w2x3yz5"
  },
  {
    "name": "Henry Davis",
    "team": "Gamma",
    "id": "u5a4b3c2d1"
  },
  {
    "name": "Irene Taylor",
    "team": "Beta",
    "id": "u9e4f3g21"
  },
  {
    "name": "Irene Adler",
    "team": "Beta",
    "id": "u9e4f3g2h1"
  },
  {
    "name": "Jack Wilson",
    "team": "Alpha",
    "id": "u1i4j3k2l1"
  } 
];

export interface userType {
  name: string,
  team: string,
  id: string
};

export interface userTypeWithSearchIndex extends userType {
  index: number,
  searchTermLength: number
}

export default userDB;