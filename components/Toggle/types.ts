export interface IToggleItem {
    onClick : () => void;
    text: string;
}

export interface IToggle {
    items: IToggleItem[];
}