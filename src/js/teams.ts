const API_URL = 'https://hp-api.onrender.com/api/characters';

// {
//     "species": "human",
//     "gender": "male",
//     "house": "Gryffindor",
//     "dateOfBirth": "31-07-1980",
//     "yearOfBirth": 1980,
//     "wizard": true,
//     "ancestry": "half-blood",
//     "eyeColour": "green",
//     "hairColour": "black",
//     "wand": {
//       "wood": "holly",
//       "core": "phoenix tail feather",
//       "length": 11
//     },
//     "patronus": "stag",
//     "hogwartsStudent": true,
//     "hogwartsStaff": false,
//     "actor": "Daniel Radcliffe",
//     "alternate_actors": [],
//     "alive": true,
//     "image": "https://ik.imagekit.io/hpapi/harry.jpg"
//   },

interface HPCharacter {
    id: string;
    name: string;
    alternate_names: string[]
    // alternate_names: Array<string>
};

async function getCharacters() {
    const characters = await fetch(API_URL);
    const data = await characters.json();
    // TODO: pinta por consola en una tabla los valores:
    // id | name | house
    // console.table(...)
    // id | name | house
    // "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8" | "Harry Potter" | "Gryffindor"
    console.table(
        data.map((i: any) => ({ id: i.id, name: i.name, house: i.house, actor: i.actor }))
    );
}

getCharacters();