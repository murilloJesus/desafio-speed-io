import { extendWith } from "lodash";

export interface Item {
    value: string,
    label: string,
    tags: string,
    subline: string
}

export interface List {
    itens: Array<Item>,
    selected: Array<string>
}

export class Searcher {
    query: Array<string>

    constructor(query: string){
        this.query = this.especialCharMask(query).split(' ');
    }

    search(str: string): boolean {
        return this.query.length ? this.query.every(el => this.especialCharMask(str).includes(el)) : true;
    }

    especialCharMask (s: string){
        let r=s.toLowerCase();
        r = r.replace(new RegExp("[àáâãäå]", 'gi'),"a");
        r = r.replace(new RegExp("æ", 'gi'),"ae");
        r = r.replace(new RegExp("ç", 'gi'),"c");
        r = r.replace(new RegExp("[èéêë]", 'gi'),"e");
        r = r.replace(new RegExp("[ìíîï]", 'gi'),"i");
        r = r.replace(new RegExp("ñ", 'gi'),"n");                            
        r = r.replace(new RegExp("[òóôõö]", 'gi'),"o");
        r = r.replace(new RegExp("œ", 'gi'),"oe");
        r = r.replace(new RegExp("[ùúûü]", 'gi'),"u");
        r = r.replace(new RegExp("[ýÿ]", 'gi'),"y");
        return r;
    }   
}

export class Factory {
    size: number
    entries: Array<any>

    constructor(entries: any, size = 20){
        this.size = size
        this.entries = entries
    }

    search(str: string): Array<Item> {
        const searcher = new Searcher(str),
            finalSearch: Array<Item> = []

        this.entries.every((el: any) => {
            if(searcher.search(`${el.label} ${el.value} ${el.tags}`))
                finalSearch[finalSearch.length] = this.create(el);

            if(finalSearch.length == this.size) return false;
            else return true;
        })

        return finalSearch;
    }

    create(object: any): Item {
    
        return {
            value: object.value,
            label: object.label,
            tags: object.tags,
            subline: object.subline
        }
    }
}

export class Storage {
    getSelected(key: string): Array<string> {
        const instance = localStorage.getItem(key);
        if(typeof instance == 'string') 
            return JSON.parse(instance)
        else return []
    }
}