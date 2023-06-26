import React, { useState } from "react";
import { ExpendituresModal } from "./Expenditures";
import { TransactionModal } from "../transaction/Transaction";
import { CategoryModal } from "./Category";

const Expenditures = () => {
  const [expenModal, setExpenModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center pt-5">
        {expenModal && (
          <ExpendituresModal
            show={expenModal}
            onHide={() => setExpenModal(false)}
          />
        )}
        {transactionModal && (
          <TransactionModal
            show={transactionModal}
            onHide={() => setTransactionModal(false)}
          />
        )}
        {categoryModal && (
          <CategoryModal
            show={categoryModal}
            onHide={() => setCategoryModal(false)}
          />
        )}
        <button className="button-87" onClick={() => setExpenModal(true)}>
          Expenditures
        </button>
        <button
          className="button-87 mx-3"
          onClick={() => setTransactionModal(true)}
        >
          Transaction
        </button>
        <button className="button-87 " onClick={() => setCategoryModal(true)}>
          Catagory
        </button>
      </div>
    </>
  );
};

export default Expenditures;
