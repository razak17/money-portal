import { InputType, Field } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class UpdateProfileInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field(() => String, { nullable: true })
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string;
  @Field(() => String, { nullable: true })
  dob: string;
  @Field(() => String, { nullable: true })
  gender: string;
  @Field(() => String, { nullable: true })
  phone: string;
  @Field(() => String, { nullable: true })
  address: string;
  @Field(() => String, { nullable: true })
  city: string;
  @Field(() => String, { nullable: true })
  zipCode: string;
}

