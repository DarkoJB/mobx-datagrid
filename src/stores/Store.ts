import { CustomStore, DataSource } from "devextreme/common/data";
import { makeAutoObservable, reaction } from "mobx";
import { graceLog } from "../utils/graceLog";

export interface iData {
  id: string;
  value: number;
}

export class Store {
  constructor() {
    makeAutoObservable(this);
    this.dataSource = this.createDataSource();

    reaction(
      // This reaction is needed to have a seamless update experience
      () => this.data.length,
      () => this.dataSource.reload()
    );
  }

  dataSource: DataSource;

  data: iData[] = [
    { id: "1", value: 1 },
    { id: "2", value: 2 },
    { id: "3", value: 3 },
    { id: "4", value: 4 },
    { id: "5", value: 5 },
    { id: "6", value: 6 },
    { id: "7", value: 7 },
    { id: "8", value: 8 },
    { id: "9", value: 9 },
    { id: "10", value: 10 },
  ];

  setData = () => {
    const value = this.data.length + 1;
    // Adding data member to observable data
    this.data = [...this.data, { id: value.toString(), value }];
  };

  createDataSource = () => {
    return new DataSource({
      key: "id",
      loadMode: "processed",
      onModified: (e: any) => {
        console.log("🚀 ~ Store ~ e:", e);
      },
      load: async () => {
        return { data: this.data, totalCount: this.data.length };
      },
      update: (key, values) => {
        graceLog.log("🚀 ~ DataSource ~ Update:", key, values);
        // This is basically what updating the data in the grid would look like
        for (const item of this.data) {
          if (item.id === key) {
            this.data[Number(item.id) - 1] = values;
          }
        }

        return Promise.resolve();
      },
    });
  };
}
