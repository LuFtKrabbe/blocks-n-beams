import photoAlexander from '../../assets/photoAlexander.png';
import photoSergei from '../../assets/photoAndrei.png';
import photoElena from '../../assets/photoElena.png';
import photoAndrei from '../../assets/photoSergey.png';

export type MemberData = {
  name: string;
  role: string;
  contribution?: string;
  bio: string;
  link: string;
  photo: string;
};

export const elena: MemberData = {
  name: 'Elena Nikonova',
  role: 'Mentor',
  bio: 'Frontend-developer and graduating student of the Rolling scope school in 2021 year',
  link: 'https://github.com/elenaniksy',
  photo: photoElena,
};

export const alexander: MemberData = {
  name: 'Alexander Filimonov',
  role: 'Teamlead',
  contribution: `Task board working with scrum agile metodology, shop's
  content filling, implementation of detailed product card and about us pages, 
  stylization of the project and tests writing`,
  bio: `Master's and bachelor's degree with honor in Civil Engineering. Structural design engineer 
  with 2 years of work experience`,
  link: 'https://github.com/LuFtKrabbe',
  photo: photoAlexander,
};

export const sergey: MemberData = {
  name: 'Sergey Vergun',
  role: 'Developer',
  contribution: `Repository and environment configuration setup, work with session 
  flows, login and registration of the users and their profile information, products searching 
  and user's basket implementation, errors handling and bug fixing`,
  bio: `Specialist degree in Information Systems and Technologies at Peter the Great St. Petersburg Polytechnic University. 
  9 years of work experience as HPC Cluster System Engineer`,
  link: 'https://github.com/severgun',
  photo: photoAndrei,
};

export const andrei: MemberData = {
  name: 'Andrei Kalasouski',
  role: 'Developer',
  contribution: `CommerceTools project setup, creation of login, registration, 
  main and error pages, routing and navigation implementation, product categories 
  menu and cards with its sorting and pagination, work with user's basket`,
  bio: 'The best developer',
  link: 'https://github.com/Nevold',
  photo: photoSergei,
};
