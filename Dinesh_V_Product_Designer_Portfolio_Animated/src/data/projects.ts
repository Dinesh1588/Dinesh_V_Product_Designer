export type Project = {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  { number: '01', title: 'Aalayam', subtitle: 'Temple operations & donation management', category: 'Product Design · Case Study', image: '/images/projects/aalayam.svg', href: 'https://www.behance.net/gallery/233688403/Aalayam-Case-Study' },
  { number: '02', title: 'Ghost of Tsushima', subtitle: 'Immersive gaming web experience', category: 'Interaction · Motion', image: '/images/projects/ghost.svg', href: 'https://www.behance.net/gallery/223657645/Gaming-Website-Parallax-Effect' },
  { number: '05', title: 'Onam Food App', subtitle: 'Festival-themed mobile exploration', category: 'UI · Interaction', image: '/images/projects/onam.svg', href: 'https://www.behance.net/gallery/234526633/Onam-Themed-Food-App' }
];
