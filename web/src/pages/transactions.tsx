import * as React from "react";
import {
  Footer,
  Layout,
  PageHeader,
  EditDeleteAccountButton,
  MainContent,
  AccountStats,
  AddTransaction,
  CreateAccountModal,
  SideBar,
  TransactionsList,
  DeleteAccountModal,
  EditAccountModal,
} from "../components";
import { useGetAccountFromUrl } from "../utils/useGetAccountFromUrl";
import { useGetIntId } from "../utils/useGetIntId";
import { toTitleCase } from "../utils/toTitleCase";

interface TransactionsProps {}

export const Transactions: React.FC<TransactionsProps> = () => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = React.useState(
    false
  );
  const [showEditAccountModal, setShowEditAccountModal] = React.useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = React.useState(
    false
  );

  const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const handleClosDeleteAccounteModal = () => setShowDeleteAccountModal(false);

  const handleShowEditAccountModal = () => setShowEditAccountModal(true);
  const handleCloseEditAccountModal = () => setShowEditAccountModal(false);

  const handleShowCreateAccountModal = () => setShowCreateAccountModal(true);
  const handleCloseCreateAccountModal = () => setShowCreateAccountModal(false);

  const { data, loading } = useGetAccountFromUrl();
  const intId = useGetIntId();
  console.log("intId", intId);

  return (
    <Layout>
      <SideBar onOpen={handleShowCreateAccountModal} />
      <MainContent>
        <PageHeader
          heading={
            loading
              ? "loading..."
              : data && data?.bankAccount
              ? `${toTitleCase(
                  data?.bankAccount?.name
                )} Account - ${toTitleCase(data?.bankAccount?.type)}`
              : "Transactions"
          }
        />
        <CreateAccountModal
          isOpen={showCreateAccountModal}
          onClose={handleCloseCreateAccountModal}
        />
        <EditAccountModal
          isOpen={showEditAccountModal}
          onClose={handleCloseEditAccountModal}
        />
        <DeleteAccountModal
          isOpen={showDeleteAccountModal}
          onClose={handleClosDeleteAccounteModal}
        />
        <EditDeleteAccountButton
          onOpenEdit={handleShowEditAccountModal}
          onOpenDelete={handleShowDeleteAccountModal}
        />
        <AccountStats
          balance={data?.bankAccount?.currentBalance}
          spending={data?.bankAccount?.monthlySpending}
          deposits={data?.bankAccount?.monthlyDeposits}
          transactions={data?.bankAccount?.monthlyTransactions}
          loading={loading}
        />
        <AddTransaction />
        <TransactionsList />
        <Footer />
      </MainContent>
    </Layout>
  );
};
