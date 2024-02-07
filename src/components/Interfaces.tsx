export type UserSession = {
  user: {
    name: string;
    id: string;
    phonenumber: string;
    schoolId: string;
    roles: {
      userId: string;
      role: string
    }[]
  }
} | null