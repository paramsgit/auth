import * as React from "react";
import Layout from "../layout";
import HistoryData from "./historyData";

interface IHistoryProps {}

const History: React.FunctionComponent<IHistoryProps> = (props) => {
 

  return (
    <>
      <Layout>
        <HistoryData/>
        
      </Layout>
    </>
  );
};

export default History;
