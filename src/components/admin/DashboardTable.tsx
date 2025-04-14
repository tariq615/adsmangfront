import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DataType {
  name?: string;
  date: number;
  package: number;
  amount: number;
  
}

const columns: Column<DataType>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Package",
    accessor: "package",
  },
  {
    Header: "Amount",
    accessor: "amount",
  }
];

const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",
    "Top Subscribers",
  )();
};

export default DashboardTable;
