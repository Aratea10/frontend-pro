// TS infiere el tipo string
const API_URL = 'https://hp-api.onrender.com/api/characters';

type HPHouse = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw';

interface HPCharacterWand {
    wood: string;
    core: string;
    length: string;
}

interface HPCharacter {
    id: string;
    name: string;
    alternate_names: string[];
    // alternate_names: Array<string>
    // alternate_names: [string]
    species: string;
    gender: string;
    house: HPHouse;
    dateOfBirth: string;
    yearOfBirth: number;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    // wand: {
    //     wood: string;
    //     core: string;
    //     length: string;
    // }
    wand: HPCharacterWand;
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: string[];
    alive: boolean;
    image: string;
};

async function getCharacters() {
    let obj: Object;
    const characters = await fetch(API_URL);
    const data = (await characters.json()) as HPCharacter[];
    // TODO: pinta por consola en una tabla los valores:
    // id | name | house
    // console.table(...)
    // id | name | house
    // "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8" | "Harry Potter" | "Gryffindor"
    console.table(
        data.filter(i => i.hogwartsStudent).map((i) => ({ id: i.id, name: i.name, house: i.house, actor: i.actor, patronus: i.patronus }))
    );
}

getCharacters();