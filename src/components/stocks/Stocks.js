import React from 'react';

const Stocks = ({ stocks }) => {
  return (
    <tr>
        <td>{stocks.STATUS}</td>
        <td>{stocks.SHAPE}</td>
        <td style={{color: 'red'}}>{(stocks.DIA_MN)}</td>
        <td style={{color: 'green'}}>{stocks.DIA_MX}</td>
        <td>{stocks.GIRDLE}</td>
        <td>{stocks.COMMENT ? stocks.COMMENT : 'N/A' }</td>
        <td>{stocks.LOC}</td>
        <td>{stocks.COL}</td>
        <td>{stocks.CUT}</td>
        <td>{stocks.Origin}</td>
        <td>{stocks.CATEGORY}</td>
    </tr>
  );
};

export default Stocks;