export interface Person {
  Nom: string;
  Prénom: string;
  Email: string;
  Adresse: string;
  Téléphone: string;
  Ville: string;
  "Code Postal": string;
  "Date de Naissance": string;
  "Département de Naissance": string;
  IBAN: string;
}

export const testPersons: Person[] = [
  {
    Nom: "Martin",
    Prénom: "Pierre",
    Email: "pierre.martin@email.com",
    Adresse: "15 rue de la Paix",
    Téléphone: "01 42 33 44 55",
    Ville: "Paris",
    "Code Postal": "75001",
    "Date de Naissance": "1985-03-15",
    "Département de Naissance": "75",
    IBAN: "FR14 2004 1010 0505 0001 3M02 606"
  },
  {
    Nom: "Dubois",
    Prénom: "Marie",
    Email: "marie.dubois@email.com",
    Adresse: "23 avenue Victor Hugo",
    Téléphone: "04 67 89 12 34",
    Ville: "Montpellier",
    "Code Postal": "34000",
    "Date de Naissance": "1990-07-22",
    "Département de Naissance": "34",
    IBAN: "FR76 3000 6000 0112 3456 7890 189"
  },
  {
    Nom: "Leclerc",
    Prénom: "Jean",
    Email: "jean.leclerc@email.com",
    Adresse: "8 place du marché",
    Téléphone: "02 98 45 67 89",
    Ville: "Brest",
    "Code Postal": "29200",
    "Date de Naissance": "1978-11-08",
    "Département de Naissance": "29",
    IBAN: "FR14 2004 1010 0505 0001 3M02 607"
  },
  {
    Nom: "Rousseau",
    Prénom: "Sophie",
    Email: "sophie.rousseau@email.com",
    Adresse: "42 boulevard des Capucines",
    Téléphone: "04 91 23 45 67",
    Ville: "Marseille",
    "Code Postal": "13001",
    "Date de Naissance": "1992-01-30",
    "Département de Naissance": "13",
    IBAN: "FR76 3000 6000 0112 3456 7890 190"
  },
  {
    Nom: "Moreau",
    Prénom: "Antoine",
    Email: "antoine.moreau@email.com",
    Adresse: "17 rue des Lilas",
    Téléphone: "05 56 78 90 12",
    Ville: "Bordeaux",
    "Code Postal": "33000",
    "Date de Naissance": "1987-05-14",
    "Département de Naissance": "33",
    IBAN: "FR14 2004 1010 0505 0001 3M02 608"
  },
  {
    Nom: "Bernard",
    Prénom: "Claire",
    Email: "claire.bernard@email.com",
    Adresse: "9 impasse des Roses",
    Téléphone: "04 78 12 34 56",
    Ville: "Lyon",
    "Code Postal": "69001",
    "Date de Naissance": "1989-09-03",
    "Département de Naissance": "69",
    IBAN: "FR76 3000 6000 0112 3456 7890 191"
  },
  {
    Nom: "Petit",
    Prénom: "Lucas",
    Email: "lucas.petit@email.com",
    Adresse: "31 cours de la République",
    Téléphone: "03 80 45 67 89",
    Ville: "Dijon",
    "Code Postal": "21000",
    "Date de Naissance": "1993-12-20",
    "Département de Naissance": "21",
    IBAN: "FR14 2004 1010 0505 0001 3M02 609"
  },
  {
    Nom: "Robert",
    Prénom: "Emma",
    Email: "emma.robert@email.com",
    Adresse: "55 rue Nationale",
    Téléphone: "02 40 98 76 54",
    Ville: "Nantes",
    "Code Postal": "44000",
    "Date de Naissance": "1986-04-18",
    "Département de Naissance": "44",
    IBAN: "FR76 3000 6000 0112 3456 7890 192"
  }
];