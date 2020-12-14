import {
  Arg,
  Ctx,
  ObjectType,
  Field,
  Mutation,
  Resolver,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import argon2 from "argon2";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { validateEmail } from "../utils/validateEmail";
import { COOKIE_NAME } from "../constants";

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

@Resolver(User)
export class UserResolver {
  // Hide current user email
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return null;
  }

  // Hide current user username
  @FieldResolver(() => String)
  username(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.username;
    }
    return null;
  }

  // Current User
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.id) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  // Register
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const passwordHash = await argon2.hash(options.password);
    let user;
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: passwordHash,
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

  // Login
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      validateEmail(usernameOrEmail)
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      if (validateEmail(usernameOrEmail)) {
        return {
          errors: [
            {
              field: "usernameOrEmail",
              message: "that email does not exist.",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that user does not exist.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password.",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  // Logout
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
