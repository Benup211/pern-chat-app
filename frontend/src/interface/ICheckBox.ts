export interface ICheckBoxProps{
    onCheckBoxChange:(gender:"male"|"female")=>void;
    selectedGender:string;
}