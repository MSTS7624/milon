// Demo accounts for testing
export const DEMO_ACCOUNTS = {
  user: {
    email: "user@demo.com",
    password: "demo123",
    name: "John Seeker",
    type: "user" as const,
  },
  publisher: {
    email: "employer@demo.com",
    password: "demo123",
    name: "Tech Company HR",
    type: "publisher" as const,
  },
}
