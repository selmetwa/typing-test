import randomWords from 'random-words';

export const generateWords = (count) => {
    return randomWords(count)
}

export const currentTime = () => new Date().getTime();