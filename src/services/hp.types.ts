export type HPHouse = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw';

// enum genera más código en el bundle final.
// export enum HPHouse {
//     GRYFFINDOR = 'Gryffindor',
//     SLYTHERIN = 'Slytherin',
//     HUFFLEPUFF = 'Hufflepuff',
//     RAVENCLAW = 'Ravenclaw',
// };

export interface HPCharacter {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: HPHouse;
    dateOfBirth: string | null;
    yearOfBirth: number | null;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: Wand;
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: string[];
    alive: boolean;
    image: string;
}

export interface Wand {
    wood: string;
    core: string;
    length: number;
}