
export const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@mail.fr',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'invalidmail',
    },
    {
        id: '3',
        name: false,
        email: 'jdoe@mail.fr',
    }
];

export const mockUsersRepository = {
    addUser: jest.fn(async (payload) => {
        if (!payload.email.includes('@')) {
        throw new Error('Invalid email');
        }

        // if user.name is not a string
        if (typeof payload.name !== 'string') {
        throw new Error('Invalid name');
        }

        const newUser = {
        ...payload,
        id: '10',
        };

        mockUsers.push(newUser);
        return newUser;
    }),
    // getUsers return all users of the mockUsers array
    getUsers: jest.fn(() => {
        return mockUsers
    }),
    getUser: jest.fn((id) => mockUsers.find(user => user.id === id)),
    updateUser: jest.fn(async (userId, updatedData) => {
        const userIndex = mockUsers.findIndex((user) => user.id === userId);
        if (userIndex < 0) {
        throw new Error('User not found');
        }
        mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updatedData,
        };

        return mockUsers[userIndex];
    }),
    deleteUser: jest.fn(async (userId) => {
        const userIndex = mockUsers.findIndex((user) => user.id === userId);
        if (userIndex < 0) {
        throw new Error('User not found');
        }
        const deletedUser = mockUsers[userIndex];
        mockUsers.splice(userIndex, 1);

        return deletedUser;
    }),
}
