export type AIMessage = {
    id: number;
    role: "ai" | "user";
    text: string;
};