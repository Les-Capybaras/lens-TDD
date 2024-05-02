import { describe, expect, it } from "@jest/globals";
import UserService from "../../components/user/user.service";
import { mockUsers, mockUsersRepository } from "./user.mock";

describe("UserService", () => {
    const userService = new UserService(mockUsersRepository);

    describe("addUser", () => {
        it("should be able to add a user", async () => {
            // GIVEN
            const payload = {
                name: "John Doe",
                email: "johndoe@mail.fr",
            };

            const expectedUser = {
                id: "10",
                ...payload,
            };

            // WHEN
            const createdUser = await userService.addUser(payload);

            // THEN
            expect(createdUser).toEqual(expectedUser);
            expect(mockUsers).toHaveLength(4);
        });

        it("should throw a validation error if mail is not valid", async () => {
            // GIVEN
            const payload = {
                name: "Jane Doe",
                email: "invalidmail",
            };

            // WHEN
            const createdUser = userService.addUser(payload);

            // THEN
            await expect(createdUser).rejects.toThrow("Invalid email");
        });

        it("should throw a validation error if name is not valid", async () => {
            // GIVEN
            const payload = {
                name: false,
                email: "jdoe@mail.fr"
            };

            // WHEN
            const createdUser = userService.addUser(payload);

            // THEN
            await expect(createdUser).rejects.toThrow("Invalid name");
        })
    });

    describe("getUsers", () => {
        it("should return all users", async () => {
            // WHEN
            const users = await userService.getUsers();

            // THEN
            expect(users).toEqual(mockUsers);
        });

        it("should return a user by id", async () => {
            // GIVEN
            const id = "1";

            // WHEN
            const user = await userService.getUser(id);

            // THEN
            expect(user).toEqual(mockUsers[0]);
        });
    });
});
