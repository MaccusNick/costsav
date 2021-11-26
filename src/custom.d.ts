type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object|string
  createdAt?: Date; //类/构造函数
};

type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //sucess 表示成功 1 表示duplicated重复
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  findTag:(id:string)=>Tag | undefined;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel["update"];
}
