import * as React from "react"
import { useColorModeValue, Box, Flex, Button } from "@chakra-ui/react"
import { useFormik } from "formik"
import { InputField, SelectField } from "../partials"
import { transactionOptions } from "../../types"
import { useNewTransactionMutation } from "../../generated/graphql"
import { useGetIntId, toErrorMap, AddTransactionSchema } from "../../utils"

interface AddTransactionFormProps {}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = () => {
  const intId = useGetIntId()
  const btnHover = useColorModeValue("brandBlue.400", "brandGreen.600")
  const btnColor = useColorModeValue("gray.50", "gray.200")
  const btnBg = useColorModeValue("brandBlue.500", "brandGreen.500")

  const inputFieldRef = React.useRef<HTMLInputElement>(null)

  const [newTransaction] = useNewTransactionMutation()

  const formik = useFormik({
    initialValues: {
      amount: "",
      type: transactionOptions[0],
      memo: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: AddTransactionSchema,
    onSubmit: async (values, actions) => {
      console.log(values)
      const res = await newTransaction({
        variables: {
          input: {
            ...values,
            amount: parseFloat(values.amount),
          },
          bankAccountId: intId,
        },
        update: (cache) => {
          cache.evict({ fieldName: "totalTransactions" })
          cache.evict({ fieldName: "transactions" })
          cache.evict({ fieldName: "bankAccount" })
          cache.gc()
        },
      })
      if (res.data?.newTransaction.errors) {
        console.log(res.data?.newTransaction.errors)
        actions.setErrors(toErrorMap(res.data.newTransaction.errors))
      } else if (
        res.data?.newTransaction.transaction &&
        inputFieldRef.current
      ) {
        actions.resetForm()
        inputFieldRef.current.focus()
      }
    },
  })

  const { getFieldProps, handleSubmit, isSubmitting, errors } = formik

  return (
    <Flex mr={0} ml={0} flexWrap="wrap">
      <Box
        p={2}
        flex={{ base: "0 0 auto", xl: "0 0 25%" }}
        w={{ base: "100%", sm: "100%", md: "50%", xl: "25%" }}
      >
        <Flex position="relative">
          <Box flex="1 1 auto" p="0.5em 0">
            <InputField
              amount
              label="Amount"
              {...getFieldProps("amount")}
              name="amount"
              error={errors.amount}
              elementRef={inputFieldRef}
            />
          </Box>
        </Flex>
      </Box>

      <Box
        flex={{ base: "0 0 auto", xl: "0 0 25%" }}
        p={2}
        w={{ base: "100%", sm: "100%", md: "50%", xl: "25%" }}
      >
        <Flex position="relative">
          <Box flex="1 1 auto" p="0.5em 0">
            <SelectField
              label="Transaction Type"
              {...getFieldProps("type")}
              name="type"
              error={errors.type}
              selectOptions={transactionOptions}
            />
          </Box>
        </Flex>
      </Box>
      <Box
        flex={{ base: "0 0 auto", xl: "0 0 40%" }}
        p={2}
        w={{ base: "100%", sm: "100%", md: "50%", xl: "25%" }}
      >
        <Flex position="relative">
          <Box flex="1 1 auto" p="0.5em 0">
            <InputField
              error={errors.memo}
              {...getFieldProps("memo")}
              name="memo"
              label="Memo"
            />
          </Box>
        </Flex>
      </Box>
      <Box
        p="0.5rem"
        ml="auto"
        flex="0 0 auto"
        width="auto"
        alignSelf="flex-end"
        maxW="100%"
      >
        <Box flex="1 1 auto" p="0.5em 0">
          <Button
            size="xs"
            bg={btnBg}
            color={btnColor}
            _hover={{
              bg: btnHover,
            }}
            onClick={() => handleSubmit()}
            type="submit"
            isLoading={isSubmitting}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
