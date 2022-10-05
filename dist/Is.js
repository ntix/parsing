import { RootParser } from './parsing';
/** Starting point for a new parsing and validating */
export class Is {
    constructor() {
        throw new Error('static class');
    }
}
Is.required = new RootParser(true);
Is.boolean = new RootParser().boolean;
Is.int = new RootParser().int;
Is.float = new RootParser().float;
Is.date = new RootParser().date;
Is.string = new RootParser().string;
Is.array = new RootParser().array;
Is.for = new RootParser().for;
Is.use = new RootParser().use;
