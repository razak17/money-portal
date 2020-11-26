import { useDisclosure } from "@chakra-ui/react";
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
} from "../components";
import { DeleteAccountModal } from "../components/DeleteAccountModal";
import { EditAccountModal } from "../components/EditAccountModal";
import { useGetAccountFromUrl } from "../utils/useGetAccountFromUrl";

interface TransactionsProps {}

const statOptions = [
  { id: "1", name: "Current Balalnce", value: "$272,00.48" },
  { id: "2", name: "Monthly Spending", value: "$22,00.48" },
  { id: "3", name: "Monthly Deposits", value: "$17,00.48" },
  { id: "4", name: "Monthly Transactions", value: "22" },
];

export const Transactions: React.FC<TransactionsProps> = () => {
  const {
    isOpen: isOpenAccount,
    onOpen: onOpenAccount,
    onClose: onCloseAccount,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { data } = useGetAccountFromUrl();
  console.log(data);

  return (
    <Layout>
      <SideBar onOpen={onOpenAccount} />
      <MainContent>
        <PageHeader heading="Transactions" />
        <CreateAccountModal isOpen={isOpenAccount} onClose={onCloseAccount} />
        <EditAccountModal isOpen={isOpenEdit} onClose={onCloseEdit} />
        <DeleteAccountModal isOpen={isOpenDelete} onClose={onCloseDelete} />
        <EditDeleteAccountButton
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
        />
        <AccountStats statOptions={statOptions} />
        <AddTransaction />
        <TransactionsList />
        <Footer />
      </MainContent>
    </Layout>
  );
};
