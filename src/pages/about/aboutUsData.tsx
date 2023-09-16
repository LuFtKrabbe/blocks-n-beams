import photoAlexander from '../../assets/photoAlexander.png';
import photoSergei from '../../assets/photoAndrei.png';
import photoElena from '../../assets/photoElena.png';
import photoAndrei from '../../assets/photoSergey.png';

export type MemberData = {
  name: string;
  role: string;
  bio: string;
  link: string;
  photo: string;
};

export const elena: MemberData = {
  name: 'Elena Nikonova',
  role: 'mentor',
  bio: 'graduate student',
  link: 'https://github.com/elenaniksy',
  photo: photoElena,
};

export const alexander: MemberData = {
  name: 'Alexander Filimonov',
  role: 'teamlead',
  bio: 'graduate student',
  link: 'https://github.com/LuFtKrabbe',
  photo: photoAlexander,
};

export const sergey: MemberData = {
  name: 'Sergey Vergun',
  role: 'coder',
  bio: 'the best coder',
  link: 'https://github.com/severgun',
  photo: photoAndrei,
};

export const andrei: MemberData = {
  name: 'Andrei Kalasouski',
  role: 'coder',
  bio: 'the best coder',
  link: 'https://github.com/Nevold',
  photo: photoSergei,
};
