import { Button, DataGrid } from "devextreme-react";
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { Store } from "../stores/Store";
import { DataGridRef } from "devextreme-react/cjs/data-grid";
import { graceLog } from "../utils/graceLog";

const Grid: FC = () => {
  const gridRef = useRef<DataGridRef>(null);
  const store = new Store();

  const logData = () => {
    graceLog.log("DataSource items:", store.dataSource);

    graceLog.log("Store.Data after adding item:", store.data);
  };

  //   const GridObserver = observer(() => {
  //     const dataSource = store.dataSource;
  //     return (
  //       <>
  //         <DataGrid
  //           keyExpr="id"
  //           ref={gridRef}
  //           dataSource={dataSource}
  //           showColumnLines={true}
  //           showRowLines={true}
  //           sorting={{ mode: "multiple" }}
  //           repaintChangesOnly={true}
  //           columnWidth={100}
  //           allowColumnResizing={true}
  //           columnResizingMode="nextColumn"
  //           columnAutoWidth={true}
  //           editing={{
  //             mode: "row",
  //             allowAdding: true,
  //             allowUpdating: true,
  //             allowDeleting: true,
  //           }}
  //         />
  //       </>
  //     );
  //   });
  const GridObserver = () => {
    const dataSource = store.dataSource;
    return (
      <>
        <DataGrid
          keyExpr="id"
          ref={gridRef}
          dataSource={dataSource}
          showColumnLines={true}
          showRowLines={true}
          sorting={{ mode: "multiple" }}
          repaintChangesOnly={true}
          columnWidth={100}
          allowColumnResizing={true}
          columnResizingMode="nextColumn"
          columnAutoWidth={true}
          editing={{
            mode: "batch",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
          }}
        />
      </>
    );
  };

  const addItemToStore = () => {
    store.setData();
    logData();
  };

  return (
    <div className="wrapper">
      <GridObserver />
      <Button text="Add Items" onClick={addItemToStore} />
    </div>
  );
};

export default Grid;
