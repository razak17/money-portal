import { Arg, Ctx, InputType, ObjectType, Field, Mutation, Resolver, Query } from 'type-graphql';
import { User } from '../entities/User';
import { getConnection } from 'typeorm';
import { MyContext } from '../types';
import argon2 from "argon2";


@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.trim().length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @",
      },
    ];
  }

  if (options.password.trim().length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  return null;
};



@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello";
  }

  // Register
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if(errors) {
      return {errors};
    }
    const passwordHash = await argon2.hash(options.password);
    let user;
    try {
      // user.create({}).save();
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: passwordHash
        })
        .returning("*")
        .execute();
      user = res.raw[0];
    } catch (err) {
      // Duplicate username error
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "that username is already taken",
            },
          ],
        };
      }
    }
    // this will set a cookie on user
    // it will keep user logged
    req.session.userId = user.id;
    return { user };
  }
}
