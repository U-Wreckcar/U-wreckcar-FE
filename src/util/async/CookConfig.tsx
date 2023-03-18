import Cookies from 'universal-cookie';

const cookies = new Cookies();

// cookies.set('cookie', 'Pacman', { path: '/' });
console.log(cookies.get('myCat'));
