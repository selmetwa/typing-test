import faker from 'faker';
import randomWords from 'random-words';

export const generateWords = (count) => {
        return randomWords(count)
    }
    // export const generateWords = (count) => {
    //     return new Array(count)
    //         .fill()
    //         .map(_ => faker.random.word().toLowerCase())
    //         // .join(' ');
    // };

export const currentTime = () => new Date().getTime();