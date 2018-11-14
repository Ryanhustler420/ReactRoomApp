import camalCase from 'camel-case';

let instance = null;

export class Cacher {
    
    cache = {};

    constructor() {
        if(!instance){
            instance = this;
        }

        return instance;
    }

    isValueCache(key){
        return this.getCacheValue(key);
    }

    cacheValue(key, value){
        this.cache[camalCase(key)] = value;
    }

    getCacheValue(key){
        return this.cache[camalCase(key)];
    }

}