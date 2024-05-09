export class KeyValuePairDB {
    key: Date;
    value: boolean;

    constructor(date: Date, booleanValue: boolean) {
        this.key = date;
        this.value = booleanValue;
    }
}