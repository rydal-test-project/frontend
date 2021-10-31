import {BaseStore} from "./base";
import {sizeNames, windowSizes} from "@constants";
import {action, computed, makeObservable, observable} from "mobx";

export class UiStore extends BaseStore {
    @observable
    windowSize = this.getWindowSize();

    constructor() {
        super();

        makeObservable(this);
    }

    @computed
    get isXs() {
        return [
            sizeNames.XS
        ].includes(this.windowSize);
    }
    @computed
    get isSm() {
        return [
            sizeNames.XS,
            sizeNames.SM,
        ].includes(this.windowSize);
    }
    @computed
    get isMd() {
        return [
            sizeNames.XS,
            sizeNames.SM,
            sizeNames.MD,
        ].includes(this.windowSize);
    }
    @computed
    get isLg() {
        return [
            sizeNames.XS,
            sizeNames.SM,
            sizeNames.MD,
            sizeNames.LG,
        ].includes(this.windowSize);
    }
    @computed
    get isXl() {
        return [
            sizeNames.XS,
            sizeNames.SM,
            sizeNames.MD,
            sizeNames.LG,
            sizeNames.XL
        ].includes(this.windowSize);
    }

    @action.bound
    updateSize() {
        this.windowSize = this.getWindowSize();
    }

    getWindowSize(): sizeNames {
        const size = document.body.clientWidth

        const test = Object.keys(windowSizes).find(sizeName => {
            // @ts-ignore
            return size < (windowSizes[sizeName as sizeNames] as number)
        })

        if (test) {
            return test as sizeNames;
        } else {
            return sizeNames.XL;
        }
    }
}
