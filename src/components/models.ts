export type FormValueListType = {
  [key: string]: number | string | undefined | null | File;
};

export type ListItemType = FormValueListType & {
  id: string;
  title: string;
  description?: string;
};
export type ListFormOnSubmit = (newValue: ListItemType) => void;
export type ListFormOnChange = (newFormItem: ListItemType) => void;
export interface ListItemFormData {
  title: { value: string };
  description: { value: string };
}
export interface ListItemFormErrorList {
  title: string;
  description: string;
}

export type CreateEmptyErrorList = () => ListItemFormErrorList;
