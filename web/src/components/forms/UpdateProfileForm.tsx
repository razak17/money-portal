import * as React from 'react';
import { InputField } from '../../components';
import { useRouter } from "next/router";
import { Box, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useUpdateProfileMutation, useMeQuery } from '../../generated/graphql';


const FormItem: React.FC = ({ children }) => {
  return (
    <Box
      flex={{ base: "0 0 auto", xl: "0 0 50%" }}
      w={{ base: "100%", sm: "100%", md: "50%", xl: "50%" }}
    >
      <Flex position="relative">
        <Box
          flex="1 1 auto"
          p="0.5em"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  )
}

interface Props {

}

export const UpdateProfileForm: React.FC<Props> = () => {
  const router = useRouter();
  const { data: MeData } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  console.log('AAAA', MeData);

  const formik = useFormik({
    initialValues: {
      username: MeData?.me ? MeData.me?.username : "",
      email: MeData?.me ? MeData.me?.email : "",
      firstName: MeData?.me?.firstName ? MeData.me?.firstName : "",
      lastName: MeData?.me?.lastName ? MeData.me?.lastName : "",
      dob: MeData?.me?.dob ? MeData.me?.dob : "",
      phone: MeData?.me?.phone ? MeData.me?.phone : "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      const {
        firstName,
        lastName,
        email,
        username,
        dob,
        phone,
      } = values
      const response = await updateProfile({
        variables: {
          options: {
            firstName,
            lastName,
            username,
            email,
            dob,
            phone: phone.toString(),
          }
        }
      })
      return;
    }
  })

  const { getFieldProps, handleSubmit, isSubmitting, errors } = formik;

  return (
    <Box>
      <Flex flexWrap="wrap">
        <FormItem>
          <InputField
            label="First Name"
            placeholder="First Name"
            {...getFieldProps("firstName")}
            name="firstName"
            error={errors.firstName}
          />
        </FormItem>
        <FormItem>
          <InputField
            label="Last Name"
            placeholder="Last Name"
            {...getFieldProps("lastName")}
            name="lastName"
            error={errors.lastName}
          />
        </FormItem>
        <FormItem>
          <InputField
            label="Username"
            placeholder="Username"
            {...getFieldProps("username")}
            name="username"
            error={errors.username}
          />
        </FormItem>
        <FormItem>
          <InputField
            type="email"
            label="Email"
            placeholder="Email"
            {...getFieldProps("email")}
            name="email"
            error={errors.email}
          />
        </FormItem>
        <FormItem>
          <InputField
            type="date"
            label="Date of birth"
            {...getFieldProps("dob")}
            name="dob"
            error={errors.dob}
          />
        </FormItem>
        <FormItem>
          <InputField
            number
            label="Phone"
            placeholder="Phone"
            {...getFieldProps("phone")}
            name="phone"
            error={errors.phone}
          />
        </FormItem>
      </Flex>
      <Flex flexWrap="wrap">
        <Box p="0.5em" ml="auto">
          <Button
            size="xs"
            onClick={() => handleSubmit()}
            type="submit"
            isLoading={isSubmitting}
          >
            Update
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

