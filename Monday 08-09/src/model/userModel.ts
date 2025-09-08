export interface User {
  rollNo: number;
  collegeName: string;
  name: string;
  course: string;
}

let users: User[] = [];

export const UserModel = {
  create: (
    rollNo: number,
    name: string,
    collegeName: string,
    course: string
  ): User => {
    const newUser: User = {
      rollNo,
      name,
      collegeName,
      course,
    };
    users.push(newUser);
    return newUser;
  },

  findById: (rollNo: number): User | undefined =>
    users.find((u) => u.rollNo === rollNo),

  update: (data: Partial<User>): User | null => {
    const user = users.find((u) => u.rollNo === data.rollNo);
    if (user) {
      user.name = data.name || user.name;
      user.collegeName = data.collegeName || user.collegeName;
      user.course = data.course || user.course;
      return user;
    }
    return null;
  },

  delete: (rollNo: number): boolean => {
    const initialLength = users.length;
    users = users.filter((u) => u.rollNo !== rollNo);
    return users.length < initialLength;
  },
};
