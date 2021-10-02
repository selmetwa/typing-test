import faker from 'faker';

export const generateWords = (count) => {
    return new Array(count)
        .fill()
        .map(_ => faker.random.word().toLowerCase())
        // .join(' ');
};

export const currentTime = () => new Date().getTime();